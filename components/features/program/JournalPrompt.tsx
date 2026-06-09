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
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      >
        <div className="rounded-2xl border bg-white p-8 text-center max-w-sm mx-4">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100">
            <PenLine className="size-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Entry Saved</h3>
          <p className="text-sm text-muted-foreground mb-4">Your reflection has been saved to your journal.</p>
          <Button onClick={onClose} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
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
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <PenLine className="size-5 text-accent" />
          <span className="text-sm font-medium text-foreground">Journal Reflection</span>
        </div>
        <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Close journal">
          <X className="size-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 mb-6">
            <p className="text-lg italic text-secondary font-medium leading-relaxed">
              &ldquo;{prompt}&rdquo;
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your reflection here..."
            className="w-full min-h-[200px] rounded-xl border border-muted-foreground/20 bg-white p-4 text-sm text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
            style={{ minHeight: "200px" }}
          />

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3" />
              This entry is private
            </div>
            <span
              className={`text-xs font-medium ${
                targetMet ? "text-accent" : "text-muted-foreground"
              }`}
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
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Entry
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
