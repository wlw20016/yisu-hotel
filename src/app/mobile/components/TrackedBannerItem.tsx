'use client'

import React from 'react'
// 引入你之前写好的曝光埋点 Hook
import { useExposureTrack } from '@/src/hooks/useExposureTrack'

// 1. 严格定义 Banner 的数据类型，坚决杜绝 any
export interface BannerType {
  id: number
  img: string
  title: string
}

// 2. 定义组件接收的 Props 类型
interface TrackedBannerItemProps {
  banner: BannerType
  onBannerClick: () => void
}

export default function TrackedBannerItem({ banner, onBannerClick }: TrackedBannerItemProps) {
  // 3. 在组件顶层调用 Hook，完全符合 React 的 Hook 规则
  const exposeRef = useExposureTrack({
    eventId: 'ad_banner_expose',
    payload: {
      bannerId: banner.id,
      bannerTitle: banner.title,
    },
  })

  return (
    // 4. 将 exposeRef 挂载到外层 DOM 上，用于 IntersectionObserver 监听
    <div
      ref={exposeRef as React.RefObject<HTMLDivElement>}
      className="w-full h-48 relative cursor-pointer active:opacity-90 transition-opacity"
      onClick={onBannerClick}
    >
      <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
      <div className="absolute bottom-6 right-0 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-l-full backdrop-blur-sm">
        {banner.title}
      </div>
    </div>
  )
}
