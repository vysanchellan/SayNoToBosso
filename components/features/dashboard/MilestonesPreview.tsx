"use client"

import { motion } from "framer-motion"
import { Flame, Diamond, ArrowRight, Lock } from "lucide-react"
import Link from "next/link"

const badges = [
  { label: "24 Hours", icon: Flame, unlocked: true, current: true },
  { label: "3 Days", unlocked: false },
  { label: "1 Week", unlocked: false },
  { label: "2 Weeks", unlocked: false },
  { label: "1 Month", unlocked: false, icon: Diamond },
]

export default function MilestonesPreview() {
  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <h3 className="text-base font-bold mb-4" style={{ color: '#F2F7F1' }}>Your Achievements</h3>

      <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {badges.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col items-center gap-1.5 min-w-[72px]"
          >
            <div
              className="flex size-16 items-center justify-center rounded-full"
              style={
                badge.unlocked
                  ? { background: 'linear-gradient(135deg, #92660A 0%, #F0B429 100%)', boxShadow: '0 0 20px rgba(240,180,41,0.35)' }
                  : { backgroundColor: '#142219', border: '1px dashed #2A4534' }
              }
            >
              {badge.unlocked ? (
                <Flame className="size-6 text-white" />
              ) : badge.icon ? (
                <Lock className="size-5" style={{ color: '#445347' }} />
              ) : (
                <Lock className="size-5" style={{ color: '#445347' }} />
              )}
            </div>
            <span
              className="text-[10px] font-semibold"
              style={{ color: badge.unlocked ? '#F0B429' : '#74917B' }}
            >
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>

      {badges[0].current && (
        <div className="mt-3 text-center">
          <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold" style={{ color: '#F0B429' }}>
            New: 24 Hours badge earned!
          </span>
        </div>
      )}

      <Link
        href="/profile"
        className="mt-4 flex items-center justify-center gap-1 text-xs font-medium transition-colors"
        style={{ color: '#4ADE80' }}
      >
        View All Achievements <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}
