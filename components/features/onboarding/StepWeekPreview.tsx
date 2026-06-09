"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Droplets, Brain, Apple, RefreshCw, BookOpen, Users, Shield } from "lucide-react"
import { useOnboarding } from "@/components/features/onboarding/useOnboarding"

const weeks = [
  { week: 1, title: "Detox & Stabilise", icon: Droplets, bullets: ["Managing withdrawal symptoms", "Sleep hygiene foundations", "Hydration protocol"] },
  { week: 2, title: "Brain Reset", icon: Brain, bullets: ["Mood regulation techniques", "Anxiety coping tools", "Breathing exercise intro"] },
  { week: 3, title: "Body Recovery", icon: Apple, bullets: ["Nutrition for brain recovery", "Gentle exercise plan", "Energy restoration"] },
  { week: 4, title: "Habit Rewiring", icon: RefreshCw, bullets: ["Identifying triggers", "Building new routines", "Craving management"] },
  { week: 5, title: "Deepening Tools", icon: BookOpen, bullets: ["Journaling practice", "Meditation foundations", "Cognitive techniques"] },
  { week: 6, title: "Resilience", icon: Shield, bullets: ["Stress management", "Emotional regulation", "Progress review"] },
  { week: 7, title: "Connection", icon: Users, bullets: ["Social reintegration", "Support network building", "Relationship repair"] },
  { week: 8, title: "Maintenance", icon: Shield, bullets: ["Long-term strategies", "Relapse prevention", "Sustainable habits"] },
]

export default function StepWeekPreview() {
  const { userTier, nextStep } = useOnboarding()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  const displayWeeks = userTier === "heavy" ? weeks : weeks.slice(0, 6)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-white sm:text-4xl">What to Expect</h2>
        <p className="mt-2 text-white/50">Your week-by-week program preview</p>
      </motion.div>

      <div className="relative w-full max-w-4xl">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur"
          aria-label="Scroll left"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur"
          aria-label="Scroll right"
        >
          <ChevronRight className="size-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayWeeks.map((w, i) => (
            <motion.div
              key={w.week}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="snap-start shrink-0 w-64 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5"
            >
              <div className="inline-flex items-center rounded-full bg-accent/20 px-3 py-0.5 text-xs font-medium text-accent mb-3">
                Week {w.week}
              </div>
              <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/20">
                <w.icon className="size-5 text-green-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{w.title}</h3>
              <ul className="space-y-1.5">
                {w.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/50">
                    <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-white/20" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={nextStep}
        className="mt-10 rounded-full bg-accent px-10 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        This Looks Great &rarr;
      </motion.button>
    </div>
  )
}
