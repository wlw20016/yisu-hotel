import React from 'react'

const DateTimeSelector: React.FC = () => {
  // 获取当前日期
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // 格式化日期为 MM月DD日 格式
  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${month}月${day}日`
  }

  // 检查是否已过0点
  const isPastMidnight = today.getHours() >= 0 && today.getHours() < 6

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-medium">{formatDate(today)} 今天</span>
          <span className="text-gray-400">-</span>
          <span className="font-medium">{formatDate(tomorrow)} 明天</span>
        </div>
        <span className="text-gray-500">共1晚</span>
      </div>
      {isPastMidnight && (
        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full text-xs mt-1">
          <span className="text-yellow-500">🌙</span>
          <span className="text-gray-600">
            当前已过0点，如需今天凌晨6点前入住，请选择&nbsp;今天凌晨&nbsp;
          </span>
        </div>
      )}
    </div>
  )
}

export default DateTimeSelector
