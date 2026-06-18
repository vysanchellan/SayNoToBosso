"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "cannaclear-popia-consent"
const POPIA_CONSENT_VERSION = "1.0.0"

export default function POPIABanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false
    return !localStorage.getItem(STORAGE_KEY)
  })
  const [dismissed, setDismissed] = useState(false)

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, POPIA_CONSENT_VERSION)
    setDismissed(true)
    setTimeout(() => setVisible(false), 400)
  }

  if (!visible) return null

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={dismissed ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ backgroundColor: '#0E1A12', borderTop: '1px solid #1F3326' }}
      role="alert"
      aria-label="Privacy consent"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-center sm:text-left" style={{ color: '#B9D0BE' }}>
          CannaClear uses cookies and stores anonymised usage data in compliance with POPIA.
          Your health data is never sold or shared.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="link" className="text-xs" style={{ color: '#74917B' }}>
            Learn More
          </Button>
          <Button
            onClick={accept}
            className="rounded-full text-sm" style={{ backgroundColor: '#4ADE80', color: '#07100B' }}
          >
            Accept &amp; Continue
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
