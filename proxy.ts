import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode('your-super-secret-key-yisu-2026')

// 定义 JWT 载荷的严格类型
interface JwtPayload {
  id: number
  username: string
  role: string
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. 梳理需要拦截的路由规则 (后端 API 和前端页面同时保护)
  const isMerchantApi = pathname.startsWith('/api/merchant')
  const isAdminApi = pathname.startsWith('/api/admin')
  const isMerchantPage = pathname.startsWith('/merchant')
  const isAdminPage = pathname.startsWith('/admin')

  // 如果不是受保护的路由，直接放行
  if (!isMerchantApi && !isAdminApi && !isMerchantPage && !isAdminPage) {
    return NextResponse.next()
  }

  // 2. 从 Cookie 中提取 Token
  const token = request.cookies.get('yisu_token')?.value

  if (!token) {
    return handleUnauthorized(request, '未登录，缺少身份令牌')
  }

  try {
    // 3. 验证并解析 JWT
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const user = payload as unknown as JwtPayload

    // 4. 越权校验 (RBAC 角色控制)
    if ((isAdminApi || isAdminPage) && user.role !== 'ADMIN') {
      return handleUnauthorized(request, '权限不足：仅管理员可访问', 403)
    }

    if ((isMerchantApi || isMerchantPage) && user.role !== 'MERCHANT') {
      return handleUnauthorized(request, '权限不足：仅商户可访问', 403)
    }

    // 5. 核心：将解析出的真实用户 ID 注入到请求头中，向下游 API 传递
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', String(user.id))
    requestHeaders.set('x-user-role', user.role)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error: unknown) {
    console.error('JWT 验证失败:', error)
    return handleUnauthorized(request, '登录已过期或凭证无效')
  }
}

// 辅助函数：根据请求类型返回对应的拦截响应
function handleUnauthorized(request: NextRequest, message: string, status = 401) {
  const isApi = request.nextUrl.pathname.startsWith('/api/')

  if (isApi) {
    return NextResponse.json({ success: false, message }, { status })
  } else {
    // 如果是直接在浏览器访问前端页面，被拦截后重定向到登录页
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
}

// 性能优化：只匹配需要处理的路径，避免每个静态资源都被中间件拦截
export const config = {
  matcher: ['/api/admin/:path*', '/api/merchant/:path*', '/admin/:path*', '/merchant/:path*'],
}
