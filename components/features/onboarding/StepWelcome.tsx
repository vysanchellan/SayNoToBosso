"use client"

import { motion } from "framer-motion"
import { useOnboarding } from "@/components/features/onboarding/useOnboarding"

export default function StepWelcome() {
  const { firstName, nextStep } = useOnboarding()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-8 flex size-24 items-center justify-center rounded-full bg-primary/30"
      >
        <svg width="48" height="48" viewBox="0 0 200 50" fill="none" aria-hidden="true">
          <path d="M12 38c0-8 6-14 14-14s14 6 14 14" stroke="#6B9E78" strokeWidth="2" strokeLinecap="round"/>
          <path d="M26 10c0 8-4 14-10 14s-10-6-10-14" stroke="#D4A017" strokeWidth="2" strokeLinecap="round"/>
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
        Welcome to CannaClear,{firstName ? ` ${firstName}` : ""}.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 max-w-lg text-lg text-white/60"
      >
        You&apos;ve made one of the most important decisions of your life. We&apos;re here to walk every step with you.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-3 max-w-md text-sm text-white/40"
      >
        Over the next few minutes, we&apos;ll show you exactly what your recovery journey looks like &mdash; week by week, day by day.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onClick={nextStep}
        className="mt-10 rounded-full bg-accent px-10 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        Let&apos;s Begin &rarr;
      </motion.button>
    </div>
  )
}
