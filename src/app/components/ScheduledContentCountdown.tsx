'use client'

import { useEffect, useState } from 'react'

type CountdownProps = {
  targetTime: string // ISO date string
  onComplete?: () => void
  type: 'opening' | 'closing'
}

export default function ScheduledContentCountdown({ targetTime, onComplete, type }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date(targetTime).getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        if (onComplete) {
          onComplete()
        } else {
          window.location.reload()
        }
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [targetTime, onComplete])

  if (type === 'closing') {
    // Simple message for closing countdown
    return (
      <div className="text-sm text-gray-600 dark:text-gray-400 italic">
        Available for {timeLeft.hours > 0 && `${timeLeft.hours}h `}
        {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    )
  }

  // Full countdown display for opening
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        ⏰ Content Available In:
      </h3>
      <div className="flex justify-center gap-4">
        {timeLeft.days > 0 && (
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Days</span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Seconds</span>
        </div>
      </div>
    </div>
  )
}