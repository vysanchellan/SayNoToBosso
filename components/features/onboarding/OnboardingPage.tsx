"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useOnboarding } from "@/components/features/onboarding/useOnboarding"
import OnboardingProgress from "@/components/features/onboarding/OnboardingProgress"
import StepWelcome from "@/components/features/onboarding/StepWelcome"
import StepTierResult from "@/components/features/onboarding/StepTierResult"
import StepWeekPreview from "@/components/features/onboarding/StepWeekPreview"
import StepDailyRoutine from "@/components/features/onboarding/StepDailyRoutine"
import StepAchievements from "@/components/features/onboarding/StepAchievements"
import StepFacilityMode from "@/components/features/onboarding/StepFacilityMode"
import StepCelebration from "@/components/features/onboarding/StepCelebration"

const steps = [
  StepWelcome,
  StepTierResult,
  StepWeekPreview,
  StepDailyRoutine,
  StepAchievements,
  StepFacilityMode,
  StepCelebration,
]

const variants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
}

export default function OnboardingPage() {
  const { currentStep, isInFacility } = useOnboarding()

  const step = currentStep === 6 && !isInFacility ? 7 : currentStep
  const StepComponent = steps[step - 1]

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a1f14 0%, #1a3d28 50%, #0f2d1e 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cpath d='M200 50C250 50 300 80 320 130C340 180 330 240 290 280C250 320 190 340 140 320C90 300 60 250 50 200C40 150 60 100 100 70C140 40 170 50 200 50Z' fill='white' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
        }}
      />

      <OnboardingProgress />

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
