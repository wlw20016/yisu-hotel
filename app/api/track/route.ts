import { NextResponse } from 'next/server'

// 严格定义接收到的埋点数据结构
interface TrackPayload {
  userId?: string | number
  timestamp: number
  url: string
  userAgent: string
  eventId: string
  eventType: 'PAGE_VIEW' | 'CLICK' | 'EXPOSURE'
  payload?: Record<string, string | number | boolean>
}

export async function POST(request: Request) {
  try {
    const body: TrackPayload = await request.json()

    // 第一阶段：我们在服务端控制台打印出来，验证前端 SDK 是否成功抓取并发送了数据
    console.log('====== 接收到前端埋点上报 ======')
    console.log(`[事件类型]: ${body.eventType}`)
    console.log(`[事件ID]: ${body.eventId}`)
    console.log(`[触发页面]: ${body.url}`)
    console.log(`[业务数据]:`, body.payload)
    console.log('==================================')

    // 埋点接口通常不需要给前端返回复杂的业务数据，只要返回 200 状态码即可
    return NextResponse.json({ success: true, message: '埋点接收成功' }, { status: 200 })
  } catch (error: unknown) {
    console.error('埋点接口解析异常:', error)
    // 即使埋点报错，也不应阻塞前端的正常业务
    return NextResponse.json({ success: false, message: '埋点接收失败' }, { status: 500 })
  }
}
