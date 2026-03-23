// 定义埋点通用参数的类型
interface TrackCommonParams {
  userId?: number | string // 如果用户已登录
  timestamp: number
  url: string
  userAgent: string
}

// 定义具体的埋点事件类型
type EventType = 'PAGE_VIEW' | 'CLICK' | 'EXPOSURE'

interface TrackEventParams {
  eventId: string // 事件的唯一标识，比如 'home_search_btn_click'
  eventType: EventType
  payload?: Record<string, string | number | boolean> // 携带的额外业务数据
}

// 获取通用参数的辅助函数
const getCommonParams = (): TrackCommonParams => {
  return {
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    // userId 可以从 localStorage 或全局状态中获取
    userId: localStorage.getItem('userId') || 'guest',
  }
}

/**
 * 核心埋点发送函数
 */
export const sendTrackEvent = (eventParams: TrackEventParams) => {
  // 服务端渲染期间不执行
  if (typeof window === 'undefined') return

  const data = {
    ...getCommonParams(),
    ...eventParams,
  }

  const trackApiUrl = '/api/track' // 假设你的后端有一个接收埋点的接口

  try {
    // 优先使用 sendBeacon，它在页面关闭或跳转时也能保证数据发送成功
    if (navigator.sendBeacon) {
      // sendBeacon 默认使用 POST，需要将数据转为 Blob 或 FormData
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
      navigator.sendBeacon(trackApiUrl, blob)
    } else {
      // 降级使用 fetch
      fetch(trackApiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true, // 类似 sendBeacon 的作用
      })
    }
  } catch (error) {
    console.error('埋点发送失败:', error)
  }
}
