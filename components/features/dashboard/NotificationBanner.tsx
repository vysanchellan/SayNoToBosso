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
        background: 'hsl(var(--primary)/0.1)',
        boxShadow: '0 0 0 1px hsl(var(--primary)/0.2)',
      }}
    >
      <div
        className="size-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: 'hsl(var(--primary)/0.2)' }}
      >
        <Sparkles className="size-4" style={{ color: 'hsl(140 40% 65%)' }} />
      </div>
      <p className="flex-1 text-sm text-foreground/80">
        <span className="font-semibold" style={{ color: 'hsl(140 40% 65%)' }}>New lesson ready: </span>
        Your Week 2 lesson &ldquo;Anxiety &amp; The Cannabis Connection&rdquo; is now available.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="flex size-7 items-center justify-center rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="size-3.5" />
      </button>
    </motion.div>
  )
}
