'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  id: string
  title: string
  href: string
  icon: React.ReactNode
}

const MobileNavbar: React.FC = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      id: 'home',
      title: '首页',
      href: '/mobile',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'profile',
      title: '个人中心',
      href: '/mobile/profile',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-2 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
              aria-label={item.title}
            >
              <div
                className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-200`}
              >
                {item.icon}
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.title}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileNavbar
