"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BadgeUnlock({
  badgeName = "Fortnight Free",
  onDismiss,
}: {
  badgeName?: string
  onDismiss: () => void
}) {
  const [visible, setVisible] = useState(true)
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true

    const duration = 3000
    const end = Date.now() + duration
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#D4A017", "#1A5C3A", "#6B9E78"],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#D4A017", "#1A5C3A", "#6B9E78"],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

    const timer = setTimeout(() => setVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onDismiss}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1.0] }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center gap-4 p-8"
      >
        <div
          className="flex size-32 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent/10 shadow-[0_0_40px_rgba(212,160,23,0.5)]"
        >
          <Shield className="size-14 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-white">Achievement Unlocked!</h2>
        <p className="text-lg text-accent font-semibold">{badgeName}</p>
        <p className="text-sm text-white/70 text-center max-w-xs">
          You&apos;ve reached Day 14 of your recovery. This is a significant milestone.
        </p>
        <Button
          onClick={onDismiss}
          className="mt-4 rounded-full bg-white text-primary hover:bg-white/90"
        >
          Keep Going
        </Button>
      </motion.div>
    </motion.div>
  )
}
