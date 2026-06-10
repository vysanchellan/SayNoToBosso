"use client"

import { useEffect, useState } from "react"

export default function StreakCounter() {
  const [count, setCount] = useState(0)
  const target = 14
  const circumference = 2 * Math.PI * 42
  const nextMilestone = 30
  const percentToNext = (target / nextMilestone) * 100

  useEffect(() => {
    const duration = 1200
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="relative size-28">
        <svg className="size-28 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
          <circle
            cx="48" cy="48" r="42" fill="none"
            stroke="hsl(38, 85%, 55%)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - percentToNext / 100)}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold font-display text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{count}</span>
        </div>
      </div>
      <p className="mt-1 text-sm text-white/60">Days Clean</p>
    </div>
  )
}
