import { NextResponse } from 'next/server'
// 👉 修改 1：引入 Prisma 命名空间，以便使用它生成的类型
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')

    // 👉 修改 2：将 any 替换为 Prisma 自动生成的精确类型 Prisma.HotelWhereInput
    const whereCondition: Prisma.HotelWhereInput = {
      status: 'PUBLISHED',
    }

    // 如果前端传了城市参数，做简单的地址模糊匹配
    if (city && city !== '我的位置') {
      whereCondition.address = {
        contains: city,
      }
    }

    const hotels = await prisma.hotel.findMany({
      where: whereCondition,
      orderBy: { star: 'desc' },
      take: 10,
    })

    return NextResponse.json({ success: true, data: hotels })
  } catch (error) {
    console.error('获取推荐酒店失败:', error)
    return NextResponse.json({ success: false, message: '获取数据失败' }, { status: 500 })
  }
}
