"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Info, X } from "lucide-react"

export default function NotificationBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-start gap-3 rounded-xl bg-secondary/15 border border-secondary/30 p-4"
    >
      <Info className="size-5 text-secondary shrink-0 mt-0.5" />
      <p className="flex-1 text-sm text-foreground/80">
        <span className="font-semibold">New lesson ready:</span> Your Week 2 lesson &ldquo;Anxiety &amp; The Cannabis Connection&rdquo; is now available.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="Dismiss notification"
      >
        <X className="size-4" />
      </button>
    </motion.div>
  )
}
