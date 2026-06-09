"use client"

import { motion } from "framer-motion"
import { useOnboarding } from "@/components/features/onboarding/useOnboarding"
import { APP_NAME } from "@/lib/constants"

const TOTAL_STEPS = 7

export default function OnboardingProgress() {
  const { currentStep } = useOnboarding()
  const progress = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <span className="text-xs font-medium text-white/40">{APP_NAME}</span>
        <span className="text-xs text-white/20">|</span>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => (
          <div key={step} className="relative flex items-center">
            <div
              className={`size-2 rounded-full transition-all duration-300 ${
                step < currentStep
                  ? "bg-primary"
                  : step === currentStep
                    ? "bg-accent ring-2 ring-accent/40"
                    : "bg-white/20"
              }`}
            />
          </div>
        ))}
        <span className="text-xs text-white/40 ml-2">
          Step {currentStep} of {TOTAL_STEPS}
        </span>
      </div>
    </>
  )
}
