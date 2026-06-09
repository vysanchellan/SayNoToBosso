"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const moods = [
  { emoji: "\u{1F614}", label: "Terrible", value: 1 },
  { emoji: "\u{1F610}", label: "Low", value: 2 },
  { emoji: "\u{1F642}", label: "Okay", value: 3 },
  { emoji: "\u{1F60A}", label: "Good", value: 4 },
  { emoji: "\u{1F604}", label: "Great", value: 5 },
]

export default function DailyCheckin() {
  const [submitted, setSubmitted] = useState(false)
  const [mood, setMood] = useState<number | null>(null)
  const [craving, setCraving] = useState(0)
  const [sleep, setSleep] = useState(0)
  const [note, setNote] = useState("")

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="size-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">Check-in complete</h3>
            <p className="text-sm text-green-600">
              Mood: {mood ? moods.find((m) => m.value === mood)?.label : "-"} &middot; Craving: {craving}/10 &middot; Sleep: {sleep}/5 stars
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Clock className="size-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Morning Check-In</span>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-1">Today&apos;s Check-In</h3>
      <p className="text-sm text-muted-foreground mb-6">How are you feeling this morning?</p>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Mood</Label>
          <div className="flex gap-3 justify-center">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={`flex flex-col items-center gap-1 rounded-xl p-3 transition-all ${
                  mood === m.value
                    ? "scale-110 ring-2 ring-primary bg-primary/5"
                    : "hover:bg-muted/50"
                }`}
                aria-label={`Mood: ${m.label}`}
              >
                <span className="text-2xl">{m.emoji}</span>
                {mood === m.value && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-medium text-primary"
                  >
                    {m.label}
                  </motion.span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">
            Craving intensity: <span className="text-accent font-bold">{craving}/10</span>
          </Label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-16 text-right">No craving</span>
            <input
              type="range"
              min="0"
              max="10"
              value={craving}
              onChange={(e) => setCraving(Number(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) ${craving * 10}%, hsl(var(--muted)) ${craving * 10}%)`,
                accentColor: "hsl(var(--accent))",
              }}
              aria-label="Craving intensity"
            />
            <span className="text-xs text-muted-foreground w-16">Intense craving</span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Sleep quality last night</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSleep(star)}
                className={`text-2xl transition-all ${
                  star <= sleep ? "scale-110" : "opacity-30"
                }`}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
              >
                {star <= sleep ? "\u2B50" : "\u2606"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Textarea
            placeholder="Anything on your mind today?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[80px] resize-none"
            aria-label="Quick note"
          />
        </div>

        <Button
          onClick={() => { setSubmitted(true); toast.success("Check-in logged ✓ Keep it up!") }}
          disabled={!mood}
          className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base"
        >
          Log Today&apos;s Check-In
        </Button>
      </div>
    </div>
  )
}
