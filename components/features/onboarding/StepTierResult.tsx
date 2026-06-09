"use client"

import { motion } from "framer-motion"
import { useOnboarding } from "@/components/features/onboarding/useOnboarding"
import { SEVERITY_TIERS } from "@/lib/constants"

const weekData: Record<string, { label: string; color: string; ring: string; badge: string; bullets: string[] }> = {
  mild: {
    label: "Mild Use",
    color: "hsl(var(--secondary))",
    ring: "#6B9E78",
    badge: "bg-secondary/20 text-secondary border-secondary/30",
    bullets: [
      "Personalised sleep hygiene protocol to manage mild withdrawal",
      "Weekly breathing and mindfulness exercises",
      "Progress tracking with 6-week check-in milestones",
    ],
  },
  moderate: {
    label: "Moderate Use",
    color: "hsl(var(--accent))",
    ring: "#D4A017",
    badge: "bg-accent/20 text-accent border-accent/30",
    bullets: [
      "Structured 10-week program with daily mood and craving tracking",
      "Cognitive behavioural techniques for trigger management",
      "Weekly clinical check-in prompts and community support access",
    ],
  },
  heavy: {
    label: "Heavy Use",
    color: "hsl(var(--destructive))",
    ring: "#E05C4B",
    badge: "bg-destructive/20 text-destructive border-destructive/30",
    bullets: [
      "Comprehensive 16-week program with intensive daily interventions",
      "Multi-modal recovery: breathwork, nutrition, sleep, and habit rewiring",
      "Priority access to clinical staff and crisis support resources",
    ],
  },
}

export default function StepTierResult() {
  const { userTier, nextStep } = useOnboarding()
  const tierInfo = SEVERITY_TIERS[userTier]
  const data = weekData[userTier]

  const circumference = 2 * Math.PI * 54

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="relative mb-6 size-32">
              <svg className="size-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="8" />
                <motion.circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={data.ring}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference * 0.34 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{tierInfo.weeks}w</span>
              </div>
            </div>

            <div className={`inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium mb-4 ${data.badge}`}>
              {data.label}
            </div>

            <p className="text-sm text-white/60 mb-6 max-w-xs">
              {tierInfo.description}
            </p>

            <div className="w-full space-y-3 text-left mb-6">
              {data.bullets.map((bullet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 size-2 rounded-full shrink-0" style={{ background: data.color }} />
                  <span className="text-sm text-white/70 leading-relaxed">{bullet}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-white/30 mb-6">
              Your tier may be reviewed by a clinical staff member
            </p>

            <button
              onClick={nextStep}
              className="w-full rounded-full bg-primary py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sounds Good &rarr;
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
