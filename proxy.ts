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
  // 1. 梳理需要拦截的路由规则
  const isLoginPage = pathname === '/login' // 或者是你实际的登录路由路径
  // 2. 从 Cookie 中提取 Token
  const token = request.cookies.get('yisu_token')?.value

  // 👉 新增逻辑：如果已经有 token，且访问的是登录页，直接在服务端把它踢到对应的后台，不让它渲染登录页！
  if (token && isLoginPage) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      const safeRole = ((payload.role as string) || '').toUpperCase()

      if (safeRole === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url))
      } else if (safeRole === 'MERCHANT') {
        return NextResponse.redirect(new URL('/merchant', request.url))
      }
    } catch (e) {
      // token 无效或过期，放行让它正常渲染登录页
    }
  }

  // 原来的未登录拦截逻辑
  if (!token && !isLoginPage) {
    return handleUnauthorized(request, '未登录，缺少身份令牌')
  }

  try {
    // 3. 验证并解析 JWT
    const { payload } = await jwtVerify(token!, JWT_SECRET)
    const user = payload as unknown as JwtPayload

    // 👉 修复核心：将数据库里取出的角色统一转为大写
    const safeRole = (user.role || '').toUpperCase()

    // 4. 越权校验 (RBAC 角色控制)
    if ((isAdminApi || isAdminPage) && safeRole !== 'ADMIN') {
      return handleUnauthorized(request, '权限不足：仅管理员可访问', 403)
    }

    if ((isMerchantApi || isMerchantPage) && safeRole !== 'MERCHANT') {
      return handleUnauthorized(request, '权限不足：仅商户可访问', 403)
    }

    // 5. 核心：将解析出的真实用户 ID 和标准化后的角色注入到请求头中
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', String(user.id))
    requestHeaders.set('x-user-role', safeRole) // 传递大写的角色

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
