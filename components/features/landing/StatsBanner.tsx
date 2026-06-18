"use client"

import { useRef, useState, useEffect } from "react"

const stats = [
  { value: "10,000+", label: "People in SA seeking cannabis treatment yearly" },
  { value: "73%", label: "Report no formal support available" },
  { value: "R28B", label: "Estimated economic impact of cannabis dependency" },
  { value: "Zero", label: "Dedicated cannabis recovery apps in SA" },
]

function CountUp({ end, suffix = "", delay = 0 }: { end: string; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numeric = parseInt(end.replace(/[^0-9]/g, ""), 10) || 100
          const hasNonNumeric = end !== String(numeric)
          const duration = 1500
          const startTime = performance.now()

          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const current = Math.floor(progress * numeric)

            if (hasNonNumeric) {
              setDisplay(end.replace(/[0-9,]+/, current.toLocaleString()))
            } else {
              setDisplay(current.toLocaleString())
            }

            if (progress < 1) requestAnimationFrame(tick)
          }

          setTimeout(() => requestAnimationFrame(tick), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, delay])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl font-bold sm:text-6xl" style={{ color: '#4ADE80' }}>{display}{suffix}</div>
    </div>
  )
}

export default function StatsBanner() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-label="Key statistics"
      style={{
        background: 'linear-gradient(135deg, #0A1A0E 0%, #142219 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-3">
              <CountUp end={stat.value} />
              <p className="text-sm leading-relaxed max-w-[200px] mx-auto" style={{ color: '#B9D0BE' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
