"use client"

import { useState, useEffect, useCallback } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from "recharts"
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const mockSleepData = [
  { day: "Mon", hours: 5.5 },
  { day: "Tue", hours: 6.0 },
  { day: "Wed", hours: 7.2 },
  { day: "Thu", hours: 6.8 },
  { day: "Fri", hours: 7.5 },
  { day: "Sat", hours: 8.0 },
  { day: "Sun", hours: 6.5 },
]

const sleepTips = [
  "Cannabis suppresses REM sleep. During withdrawal, vivid dreams are normal and a sign of brain healing.",
  "Your sleep cycle typically normalises by Week 3–4. The worst nights are usually behind you by Day 10.",
  "Magnesium glycinate (200mg) before bed may help with withdrawal insomnia. Ask your care team.",
]

function barColor(hours: number) {
  if (hours < 6) return "#E05C4B"
  if (hours < 7) return "#D4A017"
  return "#1A5C3A"
}

export default function SleepTracker() {
  const [bedTime, setBedTime] = useState("22:00")
  const [wakeTime, setWakeTime] = useState("06:30")
  const [checklist, setChecklist] = useState([false, false, false, false, false])
  const [saved, setSaved] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)

  const calcHours = useCallback(() => {
    const [bh, bm] = bedTime.split(":").map(Number)
    const [wh, wm] = wakeTime.split(":").map(Number)
    const bedMinutes = bh * 60 + bm
    const wakeMinutes = wh * 60 + wm
    const diff = wakeMinutes >= bedMinutes ? wakeMinutes - bedMinutes : wakeMinutes + 1440 - bedMinutes
    return (diff / 60).toFixed(1)
  }, [bedTime, wakeTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % sleepTips.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-4">Tonight&apos;s Sleep Plan</h3>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Moon className="size-4" /> Bedtime
            </label>
            <input
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="w-full rounded-xl border border-muted-foreground/20 bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Sun className="size-4" /> Wake up
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full rounded-xl border border-muted-foreground/20 bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="mb-4 rounded-xl bg-primary/5 px-4 py-3 text-center">
          <span className="text-sm font-medium text-primary">
            That&apos;s <strong>{calcHours()} hours</strong> of sleep
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {[
            "No screens 30 min before bed",
            "Room temperature below 20°C",
            "No cannabis or stimulants today",
            "Breathing exercise done",
            "Journal entry written",
          ].map((label, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <Switch
                checked={checklist[i]}
                onCheckedChange={(v) => {
                  const next = [...checklist]
                  next[i] = v
                  setChecklist(next)
                  setSaved(false)
                }}
              />
              <span className={`text-sm ${checklist[i] ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </label>
          ))}
        </div>

        <Button
          onClick={() => setSaved(true)}
          className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {saved ? "Plan Saved" : "Save Plan"}
        </Button>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-4">Last 7 Nights</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockSleepData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }}
                formatter={(value) => [`${value} hrs`, "Sleep"]}
                labelFormatter={(label) => `${label}`}
              />
              <ReferenceLine y={7} stroke="#6B9E78" strokeDasharray="4 4" strokeWidth={2} />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]} barSize={32}>
                {mockSleepData.map((entry, i) => (
                  <Cell key={i} fill={barColor(entry.hours)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Sage dashed line: 7-hour target
        </p>
      </div>

      <div className="relative rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-3">Sleep Tip</h3>
        <p className="text-sm text-foreground/80 leading-relaxed min-h-[60px]">{sleepTips[tipIndex]}</p>
        <div className="flex items-center justify-between mt-4">
          <button onClick={() => setTipIndex((i) => (i - 1 + sleepTips.length) % sleepTips.length)} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Previous tip">
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {sleepTips.map((_, i) => (
              <button
                key={i}
                onClick={() => setTipIndex(i)}
                className={`h-2 rounded-full transition-all ${i === tipIndex ? "w-5 bg-primary" : "w-2 bg-muted-foreground/30"}`}
                aria-label={`Tip ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={() => setTipIndex((i) => (i + 1) % sleepTips.length)} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Next tip">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
