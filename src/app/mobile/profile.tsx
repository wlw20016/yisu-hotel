import React from 'react'
import MobileNavbar from './MobileNavbar'

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 max-w-md mx-auto">
      {/* 顶部用户信息 */}
      <div className="bg-blue-600 text-white pt-16 pb-6 px-4 relative">
        {/* 右侧图标 */}
        <div className="absolute top-1 right-4 flex space-x-4">
          <div className="flex flex-col items-center">
            <button className="text-white p-1" aria-label="客服">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
            <span className="text-xs text-white mt-1">客服</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="text-white p-1" aria-label="退出">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
            <span className="text-xs text-white mt-1">退出</span>
          </div>
        </div>

        {/* 用户头像和信息 */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white overflow-hidden flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">未登录</h2>
            <button className="text-xs bg-white text-blue-600 px-3 py-1 rounded-full">
              登录/注册
            </button>
          </div>
        </div>
      </div>

      {/* 核心功能 */}
      <div className="mt-4 bg-white">
        <div className="divide-y divide-gray-100">
          {/* 登录注册 */}
          <div className="px-4 py-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">账户管理</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                <span className="text-sm text-gray-800">绑定手机</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                <span className="text-sm text-gray-800">修改密码</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* 简单提示 */}
          <div className="px-4 py-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">提示信息</h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
              <p className="text-xs text-blue-700">
                登录后可享受更多会员特权，包括优惠券领取、订单管理等服务。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <MobileNavbar />
    </div>
  )
}

export default ProfilePage
