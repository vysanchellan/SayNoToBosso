"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, ReferenceLine } from "recharts"
import { Dumbbell, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

const activityTypes = ["Walk", "Run", "Yoga", "Stretch", "Gym", "Cycling", "Swimming", "Other"] as const

const weekData = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 40 },
  { day: "Wed", minutes: 0 },
  { day: "Thu", minutes: 30 },
  { day: "Fri", minutes: 35 },
  { day: "Sat", minutes: 0 },
  { day: "Sun", minutes: 0 },
]

export default function MovementLog() {
  const [activity, setActivity] = useState<string>("")
  const [duration, setDuration] = useState(30)
  const [intensity, setIntensity] = useState<"light" | "moderate" | "intense" | null>(null)
  const [feeling, setFeeling] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [logged, setLogged] = useState(false)

  const activeDays = weekData.filter((d) => d.minutes >= 30).length

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-4">Log Activity</h3>

        <p className="text-xs font-medium text-muted-foreground mb-2">Activity Type</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {activityTypes.map((a) => (
            <button
              key={a}
              onClick={() => setActivity(a)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                activity === a
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/20 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <p className="text-xs font-medium text-muted-foreground mb-2">Duration: {duration} min</p>
        <input
          type="range"
          min={5}
          max={120}
          step={5}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full mb-4 accent-primary"
          style={{ accentColor: "#D4A017" }}
        />

        <p className="text-xs font-medium text-muted-foreground mb-2">Intensity</p>
        <div className="flex gap-2 mb-4">
          {(["light", "moderate", "intense"] as const).map((i) => (
            <button
              key={i}
              onClick={() => setIntensity(i)}
              className={`flex-1 rounded-xl border py-2 text-xs font-medium transition-all ${
                intensity === i
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted-foreground/20 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {i.charAt(0).toUpperCase() + i.slice(1)}
            </button>
          ))}
        </div>

        <p className="text-xs font-medium text-muted-foreground mb-2">How do you feel?</p>
        <div className="flex gap-2 mb-4">
          {["😔", "😐", "😊", "🔥"].map((emoji, i) => (
            <button
              key={i}
              onClick={() => setFeeling(i)}
              className={`rounded-xl border px-3 py-1.5 text-lg transition-all ${
                feeling === i ? "border-primary bg-primary/10" : "border-muted-foreground/20 hover:border-primary/50"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)"
          className="w-full rounded-xl border border-muted-foreground/20 bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
        />

        <Button
          onClick={() => setLogged(true)}
          disabled={!activity || !intensity || feeling === null}
          className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {logged ? "Activity Logged" : "Log Activity"}
        </Button>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-4">This Week&apos;s Movement</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="day" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <ReferenceLine x={30} stroke="#D4A017" strokeDasharray="4 4" strokeWidth={2} />
              <Bar dataKey="minutes" radius={[0, 6, 6, 0]} barSize={20}>
                {weekData.map((entry, i) => (
                  <Cell key={i} fill={entry.minutes >= 30 ? "#1A5C3A" : entry.minutes > 0 ? "#6B9E78" : "#e5e7eb"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Flame className="size-3" />{" "}
            {activeDays >= 4
              ? `${activeDays}/7 days active this week. Exercise reduces cannabis cravings by up to 40%.`
              : `${activeDays}/7 days active. Aim for 4+ days for maximum benefit.`}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/20">
            <Dumbbell className="size-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Why Movement Matters</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Physical exercise is one of the most evidence-based interventions for cannabis withdrawal. It increases natural dopamine and endocannabinoid levels, directly reducing cravings. Even 15 minutes of walking can shift your brain chemistry toward recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
