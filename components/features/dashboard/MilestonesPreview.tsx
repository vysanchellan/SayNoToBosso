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
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Your Achievements</h3>

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
              className={`flex size-16 items-center justify-center rounded-full border-2 ${
                badge.unlocked
                  ? "border-accent bg-accent/10 shadow-sm shadow-accent/20"
                  : "border-muted bg-muted/20"
              }`}
            >
              {badge.unlocked ? (
                <Flame className="size-6 text-accent" />
              ) : badge.icon ? (
                <Diamond className="size-6 text-muted-foreground/30" />
              ) : (
                <div className="size-6 rounded-full bg-muted" />
              )}
            </div>
            <span className={`text-[10px] font-medium ${badge.unlocked ? "text-accent" : "text-muted-foreground/50"}`}>
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>

      {badges[0].current && (
        <div className="mt-3 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
            <Flame className="size-3" /> New: 24 Hours badge earned!
          </span>
        </div>
      )}

      <Link
        href="/profile"
        className="mt-4 flex items-center justify-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        View All Achievements <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
