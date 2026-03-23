import { useState, useEffect } from 'react'

/**
 * 通用防抖 Hook
 * @param value 需要防抖的值 (泛型 T 保证类型安全)
 * @param delay 延迟时间 (毫秒)
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // 每次 value 变化时，设置一个定时器
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 清理函数：如果 value 在 delay 时间内再次变化，清除上一个定时器
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
