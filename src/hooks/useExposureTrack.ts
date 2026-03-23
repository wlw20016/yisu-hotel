'use client'

import { useEffect, useRef } from 'react'
import { sendTrackEvent } from './../utiles/track'

interface ExposureOptions {
  eventId: string
  payload?: Record<string, string | number>
}

export function useExposureTrack(options: ExposureOptions) {
  const domRef = useRef<HTMLDivElement>(null)

  // 使用 useRef 记录是否已经曝光过，避免重复上报
  const hasExposed = useRef(false)

  useEffect(() => {
    const targetNode = domRef.current
    if (!targetNode || hasExposed.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        // 当元素有至少 50% 进入可视区域时，视为有效曝光
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          sendTrackEvent({
            eventId: options.eventId,
            eventType: 'EXPOSURE',
            payload: options.payload,
          })

          hasExposed.current = true // 标记为已曝光
          observer.disconnect() // 停止监听当前元素，节省性能
        }
      },
      { threshold: 0.5 }, // 阈值设为 0.5
    )

    observer.observe(targetNode)

    return () => {
      observer.disconnect()
    }
  }, [options.eventId, options.payload])

  return domRef
}
