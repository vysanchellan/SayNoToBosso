"use client"

import { motion } from "framer-motion"
import { Flame, Diamond } from "lucide-react"
import { useOnboarding } from "@/components/features/onboarding/useOnboarding"

const badges = [
  { label: "24 Hours", icon: Flame, unlocked: true },
  { label: "3 Days", unlocked: false },
  { label: "1 Week", unlocked: false },
  { label: "2 Weeks", unlocked: false },
  { label: "1 Month", unlocked: false },
  { label: "6 Weeks", unlocked: false },
  { label: "3 Months", unlocked: false },
  { label: "6 Months", unlocked: false },
  { label: "1 Year", icon: Diamond, unlocked: false, special: true },
]

export default function StepAchievements() {
  const { nextStep } = useOnboarding()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Celebrate Every Win</h2>
        <p className="mt-2 text-white/50">Milestones that keep you going</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 sm:gap-6"
      >
        {badges.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`flex size-20 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                badge.unlocked
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                  : badge.special
                    ? "border-white/10 bg-white/5"
                    : "border-white/10 bg-white/5"
              }`}
            >
              {badge.unlocked ? (
                <Flame className="size-8 text-accent" />
              ) : badge.special ? (
                <Diamond className="size-8 text-white/20" />
              ) : (
                <div className="size-8 rounded-full bg-white/10" />
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                badge.unlocked ? "text-accent" : "text-white/30"
              }`}
            >
              {badge.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-sm text-white/40 text-center max-w-xs"
      >
        Your first badge is waiting. Just get through today.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        onClick={nextStep}
        className="mt-6 rounded-full bg-accent px-10 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        I Want Those Badges &rarr;
      </motion.button>
    </div>
  )
}
