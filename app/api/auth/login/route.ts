// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function POST(request: Request) {
//   try {
//     const { username, password } = await request.json()

//     if (!username || !password) {
//       return NextResponse.json({ message: '账号和密码不能为空' }, { status: 400 })
//     }

//     // 去数据库查询该用户
//     const user = await prisma.user.findUnique({
//       where: { username },
//     })

//     // 校验账号是否存在以及密码是否正确
//     if (!user || user.password !== password) {
//       return NextResponse.json({ message: '账号或密码错误' }, { status: 401 })
//     }

//     // 登录成功，返回不包含密码的用户信息（包含 role）
//     return NextResponse.json(
//       {
//         message: '登录成功',
//         user: {
//           id: user.id,
//           username: user.username,
//           role: user.role, // 这里是关键：将数据库中的角色返回给前端
//         },
//       },
//       { status: 200 },
//     )
//   } catch (error) {
//     console.error('登录接口报错:', error)
//     return NextResponse.json({ message: '服务器内部错误' }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

// 在实际项目中，这个密钥应该放在 .env 文件中： process.env.JWT_SECRET
const JWT_SECRET = new TextEncoder().encode('your-super-secret-key-yisu-2026')

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: '账号和密码不能为空' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user || user.password !== password) {
      return NextResponse.json({ message: '账号或密码错误' }, { status: 401 })
    }

    // 1. 构造 JWT 载荷 (Payload)
    const tokenPayload = {
      id: user.id,
      username: user.username,
      role: (user.role || '').toUpperCase(),
    }

    // 2. 签发 JWT
    const token = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h') // 设置 token 24 小时后过期
      .sign(JWT_SECRET)

    // 3. 将 Token 写入 HttpOnly Cookie
    // 注意：这里需要 await cookies() 在 Next.js 15+ 中是异步的，如果是 Next.js 13/14 则直接 cookies().set(...)
    const cookieStore = cookies()
    ;(await cookieStore).set({
      name: 'yisu_token',
      value: token,
      httpOnly: true, // 核心安全配置：禁止前端 JavaScript (如 localStorage) 读取，彻底防御 XSS
      secure: process.env.NODE_ENV === 'production', // 生产环境仅限 HTTPS 传输
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1天
    })

    return NextResponse.json(
      {
        message: '登录成功',
        user: tokenPayload,
      },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error('登录接口报错:', error)
    return NextResponse.json({ message: '服务器内部错误' }, { status: 500 })
  }
}
