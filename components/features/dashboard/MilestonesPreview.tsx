"use client"

import { motion } from "framer-motion"
import { Flame, Diamond, ArrowRight } from "lucide-react"
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
    <div className="rounded-2xl border bg-card p-5" style={{ borderColor: 'hsl(var(--border))' }}>
      <h3 className="text-sm font-semibold mb-4">Your Achievements</h3>

      <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {badges.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col items-center gap-1 min-w-[72px]"
          >
            <div
              className="flex size-16 items-center justify-center rounded-full border-2"
              style={{
                borderColor: badge.unlocked ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
                background: badge.unlocked
                  ? 'linear-gradient(135deg, hsl(var(--accent) / 0.12), hsl(var(--accent) / 0.04))'
                  : 'hsl(var(--muted) / 0.2)',
                boxShadow: badge.unlocked ? '0 4px 16px hsl(var(--accent) / 0.2)' : 'none',
              }}
            >
              {badge.unlocked ? (
                <Flame className="size-6" style={{ color: 'hsl(var(--accent))' }} />
              ) : badge.icon ? (
                <Diamond className="size-6" style={{ color: 'hsl(var(--muted-foreground) / 0.3)' }} />
              ) : (
                <div className="size-6 rounded-full" style={{ background: 'hsl(var(--muted))' }} />
              )}
            </div>
            <span
              className="text-[10px] font-medium"
              style={{
                color: badge.unlocked ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground) / 0.5)',
              }}
            >
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>

      {badges[0].current && (
        <div className="mt-3 text-center">
          <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--accent) / 0.12), hsl(var(--accent) / 0.04))',
              color: 'hsl(var(--accent))',
            }}
          >
            <Flame className="size-3" /> New: 24 Hours badge earned!
          </span>
        </div>
      )}

      <Link
        href="/profile"
        className="mt-4 flex items-center justify-center gap-1 text-sm transition-colors"
        style={{ color: 'hsl(var(--primary))' }}
      >
        View All Achievements <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
