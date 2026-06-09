"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useOnboarding } from "@/components/features/onboarding/useOnboarding"
import { useRouter } from "next/navigation"

export default function StepCelebration() {
  const { firstName } = useOnboarding()
  const router = useRouter()
  const confettiFired = useRef(false)

  useEffect(() => {
    if (confettiFired.current) return
    confettiFired.current = true

    import("canvas-confetti").then((module) => {
      const confetti = module.default
      const duration = 2000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ["#D4A017", "#6B9E78", "#1A5C3A"],
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ["#D4A017", "#6B9E78", "#1A5C3A"],
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
    })
  }, [])

  const goToDashboard = async () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="mb-8 flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-primary/30"
      >
        <svg width="56" height="56" viewBox="0 0 200 50" fill="none" aria-hidden="true">
          <path d="M12 38c0-8 6-14 14-14s14 6 14 14" stroke="#D4A017" strokeWidth="3" strokeLinecap="round"/>
          <path d="M26 10c0 8-4 14-10 14s-10-6-10-14" stroke="#6B9E78" strokeWidth="3" strokeLinecap="round"/>
          <path d="M26 10c0 8 4 14 10 14s10-6 10-14" fill="white" stroke="white" strokeWidth="0.5"/>
          <text x="58" y="32" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="22" fill="white">CannaClear</text>
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl font-bold text-white sm:text-5xl"
      >
        You&apos;re All Set{firstName ? `, ${firstName}` : ""}!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-lg text-white/60"
      >
        Your CannaClear dashboard is ready. Day 1 starts now.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        onClick={goToDashboard}
        className="mt-10 h-14 w-full max-w-sm rounded-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Go to My Dashboard &rarr;
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-sm text-white/30"
      >
        Your program begins today. You&apos;ve got this.
      </motion.p>
    </div>
  )
}
