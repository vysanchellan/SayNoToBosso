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
    <div className="rounded-2xl bg-card p-5" style={{ boxShadow: '0 0 0 1px hsl(var(--border)/0.4)' }}>
      <h3 className="text-base font-bold text-foreground mb-4">Your Achievements</h3>

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
              className="flex size-14 items-center justify-center rounded-full"
              style={
                badge.unlocked
                  ? { background: 'hsl(38 75% 48%/0.15)', boxShadow: '0 0 0 2px hsl(38 75% 48%/0.4)' }
                  : { background: 'hsl(var(--muted))' }
              }
            >
              {badge.unlocked ? (
                <Flame className="size-6 text-amber-400" />
              ) : badge.icon ? (
                <Lock className="size-5 text-muted-foreground opacity-40" />
              ) : (
                <Lock className="size-5 text-muted-foreground opacity-40" />
              )}
            </div>
            <span
              className="text-[10px] font-semibold"
              style={{ color: badge.unlocked ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))' }}
            >
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>

      {badges[0].current && (
        <div className="mt-3 text-center">
          <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold" style={{ color: 'hsl(38 75% 65%)' }}>
            🔥 New: 24 Hours badge earned!
          </span>
        </div>
      )}

      <Link
        href="/profile"
        className="mt-4 flex items-center justify-center gap-1 text-xs font-medium transition-colors"
        style={{ color: 'hsl(140 40% 60%)' }}
      >
        View All Achievements <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}
