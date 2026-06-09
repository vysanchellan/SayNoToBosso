"use client"

import { motion } from "framer-motion"
import { Sunrise, Clock, Utensils, Moon, Star } from "lucide-react"
import { useOnboarding } from "@/components/features/onboarding/useOnboarding"

const routine = [
  { icon: Sunrise, time: "Morning", label: "Hydration check-in + breathing exercise", duration: "5 min", color: "text-amber-300" },
  { icon: Clock, time: "Midday", label: "Mood & craving log", duration: "3 min", color: "text-green-300" },
  { icon: Utensils, time: "Afternoon", label: "Nutrition tip of the day", duration: "2 min", color: "text-green-300" },
  { icon: Moon, time: "Evening", label: "Sleep prep + journal entry", duration: "5 min", color: "text-blue-300" },
  { icon: Star, time: "Anytime", label: "Research library, crisis button, community", duration: "", color: "text-purple-300" },
]

export default function StepDailyRoutine() {
  const { nextStep } = useOnboarding()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Your Daily Rhythm</h2>
        <p className="mt-2 text-white/50">Small steps, massive results</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-lg space-y-1"
      >
        {routine.map((item, i) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-white/10 shrink-0">
              <item.icon className={`size-5 ${item.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{item.time}</span>
              </div>
              <p className="text-sm text-white/80 truncate">{item.label}</p>
            </div>
            {item.duration && (
              <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/50">{item.duration}</span>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-sm text-white/40 text-center max-w-sm"
      >
        This takes about 15 minutes total per day. Small steps, massive results.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        onClick={nextStep}
        className="mt-8 rounded-full bg-accent px-10 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        I&apos;m Ready &rarr;
      </motion.button>
    </div>
  )
}
