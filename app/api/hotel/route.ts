import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 从前端传来的数据中解构出表单字段
    const {
      title,
      address,
      price,
      star,
      tags,
      description,
      rooms,
      // 注意：真实项目中，商户ID应该从登录后的全局状态或Token中读取
      // 这里为了让大作业能快速跑通测试，如果没有传，我们默认用 1 (即你通过 seed.ts 创建的商户)
      merchantId = 1,
    } = body

    // 存入数据库
    const newHotel = await prisma.hotel.create({
      data: {
        title,
        address,
        price: Number(price), // 确保是数字类型
        star: Number(star),
        description,
        // 根据你的 schema.prisma，tags 和 images 是 String 类型，所以需要序列化
        tags: tags ? JSON.stringify(tags) : '[]',
        images: '[]', // 暂时还没有图片上传功能，默认存空数组
        merchantId: Number(merchantId),

        // 级联创建：同时把这个酒店下的所有房型一起写入 Room 表
        rooms: {
          create:
            rooms?.map(
              (room: { title: string; price: string | number; stock: string | number }) => ({
                title: room.title,
                price: Number(room.price),
                stock: Number(room.stock),
              }),
            ) || [],
        },
      },
    })

    return NextResponse.json({ message: '酒店及房型创建成功', hotel: newHotel }, { status: 201 })
  } catch (error) {
    console.error('保存酒店失败:', error)
    return NextResponse.json({ message: '服务器内部错误' }, { status: 500 })
  }
}
