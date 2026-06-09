"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { useOnboarding } from "@/components/features/onboarding/useOnboarding"

const bullets = [
  "Your journal entries remain private",
  "Staff see progress metrics only",
  "You can flag any check-in as private",
  "All data governed by POPIA",
]

export default function StepFacilityMode() {
  const { facilityName, nextStep } = useOnboarding()
  const location = facilityName || "a treatment facility"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-6 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-500/20">
              <ShieldCheck className="size-8 text-green-400" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white sm:text-3xl mb-2">
            You&apos;re in Good Hands
          </h2>

          <p className="text-sm text-white/60 mb-6 leading-relaxed">
            Because you&apos;re currently in a residential program at {location}, your care team can see
            your progress and check-ins. Your privacy is still protected &mdash; only anonymised progress
            data is shared with clinical staff.
          </p>

          <div className="w-full space-y-3 text-left mb-6">
            {bullets.map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 text-green-400 text-sm font-bold">&#10003;</span>
                <span className="text-sm text-white/70">{bullet}</span>
              </motion.div>
            ))}
          </div>

          <button
            onClick={nextStep}
            className="w-full rounded-full bg-primary py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            I Understand &rarr;
          </button>
        </div>
      </motion.div>
    </div>
  )
}
