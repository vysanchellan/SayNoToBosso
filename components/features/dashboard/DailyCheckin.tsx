"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
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
      <div className="rounded-2xl p-6" style={{ background: 'hsl(var(--primary)/0.1)', boxShadow: '0 0 0 1px hsl(var(--primary)/0.2)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-10 items-center justify-center rounded-full" style={{ background: 'hsl(var(--primary)/0.2)' }}>
            <CheckCircle2 className="size-5" style={{ color: 'hsl(140 40% 55%)' }} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Check-in complete</h3>
            <p className="text-sm" style={{ color: 'hsl(140 40% 55%)' }}>
              Mood: {mood ? moods.find((m) => m.value === mood)?.label : "-"} &middot; Craving: {craving}/10 &middot; Sleep: {sleep}/5 stars
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-card p-6" style={{ borderTop: '2px solid hsl(var(--primary))', boxShadow: '0 0 0 1px hsl(var(--border)/0.4)' }}>
      <p className="eyebrow mb-5" style={{ color: 'hsl(140 40% 55%)' }}>Morning Check-In</p>

      <h3 className="text-lg font-bold text-foreground mb-1">Today&apos;s Check-In</h3>
      <p className="text-sm text-muted-foreground mb-6">How are you feeling this morning?</p>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Mood</Label>
          <div className="flex gap-3 justify-center">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className="flex flex-col items-center gap-1 rounded-xl p-3 transition-all"
                style={{
                  background: mood === m.value ? 'hsl(var(--primary)/0.15)' : 'hsl(var(--muted))',
                  boxShadow: mood === m.value ? '0 0 0 2px hsl(var(--primary)/0.5)' : 'none',
                  transform: mood === m.value ? 'scale(1.15)' : 'scale(1)',
                }}
                aria-label={`Mood: ${m.label}`}
              >
                <span className="text-2xl">{m.emoji}</span>
                {mood === m.value && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-medium"
                    style={{ color: 'hsl(140 40% 65%)' }}
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
                background: `linear-gradient(to right, hsl(38 85% 48%), hsl(155 55% 30%) ${craving * 10}%, hsl(var(--muted)) ${craving * 10}%)`,
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
          className="w-full rounded-full font-medium text-white py-3 text-base"
          style={{
            background: 'linear-gradient(135deg, hsl(155, 48%, 22%), hsl(155, 55%, 28%))',
            boxShadow: '0 4px 14px rgba(13,61,36,0.40)',
          }}
        >
          Log Today&apos;s Check-In
        </Button>
      </div>
    </div>
  )
}
