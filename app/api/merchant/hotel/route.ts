import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    // 之前存在漏洞的代码： const merchantId = searchParams.get('merchantId')

    // 现在的安全做法：从中间件注入的安全 Header 中读取真实的用户 ID
    const merchantIdStr = request.headers.get('x-user-id')

    if (!merchantIdStr) {
      return NextResponse.json({ success: false, message: '无法识别商户身份' }, { status: 401 })
    }

    const merchantId = Number(merchantIdStr)

    // 使用绝对可信的 ID 去数据库查询
    const hotels = await prisma.hotel.findMany({
      where: { merchantId: merchantId },
      orderBy: { createdAt: 'desc' },
      include: { rooms: true },
    })

    return NextResponse.json({ success: true, data: hotels })
  } catch (error: unknown) {
    console.error('获取商户酒店列表失败:', error)
    return NextResponse.json({ success: false, message: '获取数据失败' }, { status: 500 })
  }
}
