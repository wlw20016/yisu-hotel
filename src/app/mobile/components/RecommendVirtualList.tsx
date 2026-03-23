'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

// 严格定义酒店数据接口
interface HotelItem {
  id: number
  title: string
  price: number
  coverImage: string
  tags: string[]
  recommendReason?: string // 模拟高度不固定的动态内容
}

export default function RecommendVirtualList() {
  const [recommendList, setRecommendList] = useState<HotelItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  // 滚动容器的 ref
  const parentRef = useRef<HTMLDivElement>(null)

  // 模拟分页获取数据
  const fetchMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)

    // 模拟网络延迟
    setTimeout(() => {
      const currentLength = recommendList.length
      if (currentLength >= 100) {
        setHasMore(false) // 模拟最多只有 100 条数据
        setIsLoading(false)
        return
      }

      const newData: HotelItem[] = Array.from({ length: 20 }).map((_, i) => {
        const id = currentLength + i
        return {
          id,
          title: `易宿精选酒店 - 豪华房间 ${id}`,
          price: 199 + Math.floor(Math.random() * 500),
          coverImage: 'https://via.placeholder.com/100',
          tags: ['近地铁', '免费取消', '超赞房东'].slice(0, Math.floor(Math.random() * 3) + 1),
          // 随机生成不同长度的推荐语，制造高度不一的卡片
          recommendReason:
            Math.random() > 0.5
              ? '入住体验极佳，周边设施齐全，是您出差旅行的不二之选。'.repeat(
                  Math.ceil(Math.random() * 3),
                )
              : undefined,
        }
      })

      setRecommendList((prev) => [...prev, ...newData])
      setIsLoading(false)
    }, 800)
  }, [isLoading, hasMore, recommendList.length])

  // 初始加载数据
  useEffect(() => {
    fetchMoreData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 初始化虚拟滚动实例
  const rowVirtualizer = useVirtualizer({
    count: recommendList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140, // 预估的基础高度，越接近平均真实高度，滚动越平滑
    overscan: 5, // 在视口外上下各多渲染 5 个元素，防止快速滑动时白屏
  })

  // 获取当前需要渲染的虚拟节点数组
  const virtualItems = rowVirtualizer.getVirtualItems()

  // 触底加载更多逻辑
  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse()
    if (!lastItem) return

    // 如果当前渲染的最后一个元素已经是数据列表的末尾，且还有更多数据，则触发加载
    if (lastItem.index >= recommendList.length - 1 && hasMore && !isLoading) {
      fetchMoreData()
    }
  }, [virtualItems, recommendList.length, hasMore, isLoading, fetchMoreData])

  return (
    <div className="bg-white rounded-t-xl overflow-hidden shadow-sm flex flex-col h-full">
      <h2 className="text-xl font-bold p-4 pb-2 text-gray-800 border-b border-gray-100">
        为你推荐
      </h2>

      {/* 滚动容器：必须有固定高度和 overflow-y-auto */}
      <div
        ref={parentRef}
        className="flex-1 overflow-y-auto"
        style={{ height: 'calc(100vh - 120px)' }} // 这里的 120px 根据你的顶部导航等实际高度调整
      >
        {/* 虚拟占位层：负责撑开真实的滚动总高度 */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* 绝对定位的渲染层 */}
          {virtualItems.map((virtualRow) => {
            const hotel = recommendList[virtualRow.index]

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                // measureElement 用于自动测量真实 DOM 高度并更新缓存
                ref={rowVirtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`, // 控制元素位置
                }}
              >
                {/* 实际的卡片 UI 渲染 */}
                <div className="flex p-4 border-b border-gray-50 bg-white">
                  <img
                    src={hotel.coverImage}
                    alt={hotel.title}
                    className="w-24 h-24 rounded-lg object-cover mr-4 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-start">
                    <h3 className="text-base font-medium text-gray-800 line-clamp-2">
                      {hotel.title}
                    </h3>

                    {/* 动态标签 */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {hotel.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 动态长度的推荐语，会导致高度发生变化 */}
                    {hotel.recommendReason && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                        {hotel.recommendReason}
                      </p>
                    )}

                    <div className="mt-auto pt-2 text-right">
                      <span className="text-xs text-gray-500 mr-1">起</span>
                      <span className="text-lg font-bold text-red-500">¥{hotel.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 底部加载状态 */}
        <div className="text-center py-4 text-sm text-gray-400">
          {isLoading ? '努力加载中...' : hasMore ? '上拉加载更多' : '没有更多酒店了'}
        </div>
      </div>
    </div>
  )
}
