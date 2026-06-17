"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, X } from "lucide-react"

export default function NotificationBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-start gap-3 rounded-2xl p-4"
      style={{
        backgroundColor: 'rgba(74,222,128,0.1)',
        boxShadow: '0 0 0 1px rgba(74,222,128,0.2)',
      }}
    >
      <div
        className="size-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: 'rgba(74,222,128,0.2)' }}
      >
        <Sparkles className="size-4" style={{ color: '#4ADE80' }} />
      </div>
      <p className="flex-1 text-sm" style={{ color: 'rgba(242,247,241,0.8)' }}>
        <span className="font-semibold" style={{ color: '#4ADE80' }}>New lesson ready: </span>
        Your Week 2 lesson &ldquo;Anxiety &amp; The Cannabis Connection&rdquo; is now available.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="flex size-7 items-center justify-center rounded-lg shrink-0 transition-colors"
        style={{ color: '#74917B' }}
        aria-label="Dismiss notification"
      >
        <X className="size-3.5" />
      </button>
    </motion.div>
  )
}
