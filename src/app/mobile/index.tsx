// src/app/mobile/index.tsx
import React from 'react'
import MobileNavbar from './MobileNavbar'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 max-w-md mx-auto">
      {/* 轮播图 */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://img95.699pic.com/photo/50048/1095.jpg_wh860.jpg"
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

      {/* 推荐酒店 */}
      <div className="mt-4 bg-white py-4">
        <div className="px-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">推荐酒店</h2>
            <button className="text-xs text-gray-500">查看更多</button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: '上海陆家嘴禧玥酒店',
                price: 900,
                score: 4.8,
                image:
                  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20room%20interior%20with%20king%20bed%20and%20city%20view&image_size=square',
              },
              {
                name: '北京王府井希尔顿酒店',
                price: 1200,
                score: 4.9,
                image:
                  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20hotel%20room%20with%20elegant%20decor&image_size=square',
              },
            ].map((hotel, index) => (
              <div key={index} className="flex space-x-3">
                <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800 mb-1">{hotel.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <span className="mr-2">浦东新区</span>
                    <span className="bg-red-50 text-red-500 px-1.5 py-0.5 rounded">近地铁</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-gray-800">{hotel.score}</span>
                      <span className="text-xs text-gray-400 ml-1">分</span>
                    </div>
                    <div className="text-sm font-semibold text-red-600">¥{hotel.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <MobileNavbar />
    </div>
  )
}

export default HomePage
