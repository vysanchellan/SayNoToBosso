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
          <circle cx="40" cy="40" r="36" fill="none" stroke="#142219" strokeWidth="5" />
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
          <span className="text-2xl font-bold font-display" style={{ color: '#F2F7F1', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium" style={{ color: '#F2F7F1' }}>{label}</span>
      <span className="text-xs uppercase tracking-wide" style={{ color: '#74917B' }}>{sublabel}</span>
    </div>
  )
}

export default function ProgressRings() {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Ring label="Sleep" value="6.5" percent={81} color="#4ADE80" sublabel="Sleep" />
        <Ring label="Hydration" value="50%" percent={50} color="#5EAEEA" sublabel="Hydration" />
        <Ring label="Mood Avg" value="7.2" percent={72} color="#F0B429" sublabel="Mood" />
        <Ring label="Craving" value="↓ 32%" percent={68} color="#92660A" sublabel="Craving" />
      </div>
    </div>
  )
}
