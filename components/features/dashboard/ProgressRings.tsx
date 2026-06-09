"use client"

import { motion } from "framer-motion"

interface RingProps {
  label: string
  value: string
  percent: number
  color: string
  sublabel: string
}

function Ring({ label, value, percent, color, sublabel }: RingProps) {
  const circumference = 2 * Math.PI * 36
  const offset = circumference * (1 - percent / 100)

  return (
    <div className="flex flex-col items-center">
      <div className="relative size-24">
        <svg className="size-24 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="hsl(var(--muted))" strokeWidth="5" />
          <motion.circle
            cx="40" cy="40" r="36" fill="none"
            stroke={color} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-foreground">{value}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-foreground">{label}</span>
      <span className="text-xs text-muted-foreground">{sublabel}</span>
    </div>
  )
}

export default function ProgressRings() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Ring label="Sleep" value="6.5 hrs" percent={81} color="hsl(var(--secondary))" sublabel="vs 8hr goal" />
      <Ring label="Hydration" value="50%" percent={50} color="hsl(200 60% 50%)" sublabel="glasses vs goal" />
      <Ring label="Mood Avg" value="7.2" percent={72} color="hsl(var(--accent))" sublabel="week average" />
      <Ring label="Craving" value="↓ 32%" percent={68} color="hsl(var(--primary))" sublabel="vs last week" />
    </div>
  )
}
