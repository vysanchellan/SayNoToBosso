"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Lock, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function JournalPrompt({
  prompt,
  onSave,
  onClose,
}: {
  prompt: string
  onSave: (text: string) => void
  onClose: () => void
}) {
  const [text, setText] = useState("")
  const [saved, setSaved] = useState(false)
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const targetMet = wordCount >= 100

  if (saved) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(7,16,11,0.8)' }}
      >
        <div className="rounded-2xl p-8 text-center max-w-sm mx-4" style={{ border: '1px solid #1F3326', backgroundColor: '#0E1A12' }}>
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ background: 'rgba(74,222,128,0.15)' }}>
            <PenLine className="size-6" style={{ color: '#4ADE80' }} />
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#F2F7F1' }}>Entry Saved</h3>
          <p className="text-sm mb-4" style={{ color: '#74917B' }}>Your reflection has been saved to your journal.</p>
          <Button onClick={onClose} className="rounded-full" style={{ backgroundColor: '#4ADE80', color: '#07100B' }}>
            Back to Program
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: '#07100B' }}
    >
      <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #1F3326', backgroundColor: '#0E1A12' }}>
        <div className="flex items-center gap-3">
          <PenLine className="size-5" style={{ color: '#4ADE80' }} />
          <span className="text-sm font-medium" style={{ color: '#F2F7F1' }}>Journal Reflection</span>
        </div>
        <button onClick={onClose} className="p-1" style={{ color: '#74917B' }} aria-label="Close journal">
          <X className="size-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <div className="rounded-2xl p-6 mb-6" style={{ border: '1px solid rgba(94,174,234,0.3)', backgroundColor: 'rgba(94,174,234,0.05)' }}>
            <p className="text-lg italic font-medium leading-relaxed" style={{ color: '#5EAEEA' }}>
              &ldquo;{prompt}&rdquo;
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your reflection here..."
            className="w-full min-h-[200px] rounded-xl p-4 text-sm resize-y focus:outline-none focus:ring-2" style={{ border: '1px solid rgba(116,145,123,0.2)', backgroundColor: '#0E1A12', color: '#F2F7F1', minHeight: '200px' }}
          />

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs" style={{ color: '#74917B' }}>
              <Lock className="size-3" />
              This entry is private
            </div>
            <span
              className="text-xs font-medium" style={{ color: targetMet ? '#4ADE80' : '#74917B' }}
            >
              {wordCount} words {targetMet && "✓"}
            </span>
          </div>

          <div className="mt-6">
            <Button
              onClick={() => {
                onSave(text)
                setSaved(true)
              }}
              disabled={text.trim().length < 10}
              className="w-full rounded-full" style={{ backgroundColor: '#4ADE80', color: '#07100B' }}
            >
              Save Entry
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
