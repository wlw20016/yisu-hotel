// src/app/mobile/index.tsx
'use client'
import React, { useState } from 'react'
import MobileNavbar from './MobileNavbar'
import DateTimeSelector from './components/DateTimeSelector'
import LocationIcon from './components/LocationIcon'

const HomePage: React.FC = () => {
  // 状态管理：当前激活的标签
  const [activeTab, setActiveTab] = useState<'domestic' | 'overseas' | 'hourly' | 'homestay'>(
    'domestic',
  )

  // 处理标签切换
  const handleTabChange = (tab: 'domestic' | 'overseas' | 'hourly' | 'homestay') => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 max-w-md mx-auto">
      {/* 轮播图 */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={
              activeTab === 'overseas'
                ? 'https://th.bing.com/th/id/R.12bed6b5916796d3c10cc9515074c539?rik=08Gbh5CYGnCLzQ&riu=http%3a%2f%2fdimg04.c-ctrip.com%2fimages%2ffd%2fvacations%2fg2%2fM0B%2fD2%2f71%2fCghzgVSY6D-ABSCjAAfhod4N74w702.jpg&ehk=xjuD7UuHA%2bGHEaIFbTqMtSvuKGoOrPRIg%2btBgaf3adU%3d&risl=&pid=ImgRaw&r=0'
                : activeTab === 'hourly'
                  ? 'https://www.bing.com/th/id/OIP.AksgwrrEt7b4N2F27rvyIgHaEl?w=202&h=128&c=8&rs=1&qlt=90&o=6&cb=defcachec1&dpr=2&pid=3.1&rm=2'
                  : activeTab === 'homestay'
                    ? 'https://img95.699pic.com/photo/50036/0204.jpg_wh860.jpg'
                    : 'https://img95.699pic.com/photo/50048/1095.jpg_wh860.jpg'
            }
            alt="酒店轮播图"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-white opacity-100"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="px-4 py-3">
        {/* 分类标签 - Tab切换 */}
        <div className="flex items-center justify-between mb-4 overflow-x-auto">
          <div className="flex items-center space-x-6">
            <span
              className={`whitespace-nowrap pb-1 cursor-pointer ${activeTab === 'domestic' ? 'text-blue-600 font-medium border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => handleTabChange('domestic')}
            >
              国内
            </span>
            <span
              className={`whitespace-nowrap pb-1 cursor-pointer ${activeTab === 'overseas' ? 'text-blue-600 font-medium border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => handleTabChange('overseas')}
            >
              海外
            </span>
            <span
              className={`whitespace-nowrap pb-1 cursor-pointer ${activeTab === 'hourly' ? 'text-blue-600 font-medium border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => handleTabChange('hourly')}
            >
              钟点房
            </span>
            <span
              className={`whitespace-nowrap pb-1 cursor-pointer ${activeTab === 'homestay' ? 'text-blue-600 font-medium border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => handleTabChange('homestay')}
            >
              民宿
            </span>
          </div>
        </div>

        {/* 国内标签内容 */}
        {activeTab === 'domestic' && (
          <>
            {/* 位置和搜索框 */}
            <div className="flex items-center h-12 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="font-medium">上海</span>
                <span className="text-gray-400 text-xs">▼</span>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          console.log('获取位置成功:', position)
                        },
                        (error) => {
                          console.error('获取位置失败:', error)
                        },
                      )
                    } else {
                      console.error('浏览器不支持地理位置')
                    }
                  }}
                >
                  <LocationIcon className="w-8 h-8" />
                </button>
              </div>
              <div className="w-px h-6 bg-gray-200 mx-3"></div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="位置/品牌/酒店"
                  className="w-full px-3 py-2 bg-gray-100 rounded text-sm border-0"
                />
              </div>
            </div>

            {/* 日期时间选择器 */}
            <div className="h-12 border-b border-gray-100 flex items-center justify-center">
              <DateTimeSelector />
            </div>

            {/* 筛选标签 */}
            <div>
              <div className="h-12 border-b border-gray-100 flex items-center">
                <div className="text-gray-500 text-sm">价格/星级</div>
              </div>
              <div className="h-12 border-b border-gray-100 flex items-center">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                    免费停车场
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                    豪华酒店
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                    上海虹桥国际机场
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 海外标签内容 */}
        {activeTab === 'overseas' && (
          <>
            {/* 位置和搜索框 */}
            <div className="flex items-center h-12 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="font-medium">新加坡</span>
                <span className="text-gray-400 text-xs">▼</span>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          console.log('获取位置成功:', position)
                        },
                        (error) => {
                          console.error('获取位置失败:', error)
                        },
                      )
                    } else {
                      console.error('浏览器不支持地理位置')
                    }
                  }}
                >
                  <LocationIcon className="w-8 h-8" />
                </button>
              </div>
              <div className="w-px h-6 bg-gray-200 mx-3"></div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="位置/品牌/酒店"
                  className="w-full px-3 py-2 bg-gray-100 rounded text-sm border-0"
                />
              </div>
            </div>

            {/* 日期时间选择器 */}
            <div className="h-12 border-b border-gray-100 flex items-center justify-center">
              <DateTimeSelector />
            </div>

            {/* 人数选择 */}
            <div className="h-12 border-b border-gray-100 flex items-center">
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="font-medium">1间房 1成人 0儿童</span>
                <span className="text-gray-400 text-xs">▼</span>
              </div>
              <div className="w-px h-6 bg-gray-200 mx-3"></div>
              <div className="text-gray-500 text-sm">价格/钻级</div>
            </div>

            {/* 海外酒店提示 */}
            <div className="h-12 border-b border-gray-100 flex items-center">
              <div className="w-full bg-blue-50 px-3 py-2 rounded">
                <span className="text-blue-600 text-sm">
                  海外酒店按人数收费，请准确选择成人和儿童数
                </span>
              </div>
            </div>

            {/* 筛选标签 */}
            <div className="h-12 border-b border-gray-100 flex items-center">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  双床房
                </span>
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  4.5分以上
                </span>
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  乌节路
                </span>
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  圣淘沙岛
                </span>
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  含早餐
                </span>
              </div>
            </div>
          </>
        )}

        {/* 钟点房标签内容 */}
        {activeTab === 'hourly' && (
          <>
            {/* 位置和搜索框 */}
            <div className="flex items-center h-12 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="font-medium">上海</span>
                <span className="text-gray-400 text-xs">▼</span>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          console.log('获取位置成功:', position)
                        },
                        (error) => {
                          console.error('获取位置失败:', error)
                        },
                      )
                    } else {
                      console.error('浏览器不支持地理位置')
                    }
                  }}
                >
                  <LocationIcon className="w-8 h-8" />
                </button>
              </div>
              <div className="w-px h-6 bg-gray-200 mx-3"></div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="位置/品牌/酒店"
                  className="w-full px-3 py-2 bg-gray-100 rounded text-sm border-0"
                />
              </div>
            </div>

            {/* 钟点房日期选择 */}
            <div className="h-12 border-b border-gray-100 flex items-center">
              <div className="font-medium">2月18日 今天</div>
            </div>
          </>
        )}

        {/* 民宿标签内容 */}
        {activeTab === 'homestay' && (
          <>
            {/* 位置和搜索框 */}
            <div className="flex items-center h-12 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="font-medium">上海</span>
                <span className="text-gray-400 text-xs">▼</span>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          console.log('获取位置成功:', position)
                        },
                        (error) => {
                          console.error('获取位置失败:', error)
                        },
                      )
                    } else {
                      console.error('浏览器不支持地理位置')
                    }
                  }}
                >
                  <LocationIcon className="w-8 h-8" />
                </button>
              </div>
              <div className="w-px h-6 bg-gray-200 mx-3"></div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="关键词/位置"
                  className="w-full px-3 py-2 bg-gray-100 rounded text-sm border-0"
                />
              </div>
            </div>

            {/* 日期时间选择器 */}
            <div className="h-12 border-b border-gray-100 flex items-center justify-center">
              <DateTimeSelector />
            </div>

            {/* 人数选择 */}
            <div className="h-12 border-b border-gray-100 flex items-center">
              <div className="font-medium">人/床/居数不限</div>
            </div>

            {/* 筛选标签 */}
            <div className="h-12 border-b border-gray-100 flex items-center">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  今夜特价
                </span>
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  春节特惠
                </span>
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  积分当钱花
                </span>
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  外滩
                </span>
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm">
                  浦芬
                </span>
              </div>
            </div>
          </>
        )}

        {/* 查询按钮 */}
        <div className="py-4">
          <button className="w-full py-3 rounded-full font-medium text-lg bg-blue-600 text-white">
            查询
          </button>
        </div>

        {/* 服务保障 */}
        {activeTab === 'overseas' && (
          <div className="flex items-center justify-center space-x-4 py-3">
            <div className="flex items-center space-x-1">
              <span className="text-green-500">🛡️</span>
              <span className="text-gray-600 text-sm">安心出境游</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-green-500">🛏️</span>
              <span className="text-gray-600 text-sm">入住保障</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-green-500">📞</span>
              <span className="text-gray-600 text-sm">7×24h客服</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-green-500">🚨</span>
              <span className="text-gray-600 text-sm">应急支援</span>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航栏 */}
      <MobileNavbar />
    </div>
  )
}

export default HomePage
