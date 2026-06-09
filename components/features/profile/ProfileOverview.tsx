"use client"

import { useState } from "react"
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts"
import { Camera } from "lucide-react"

const moods = [
  { day: "D1", mood: 3 }, { day: "D2", mood: 4 }, { day: "D3", mood: 2 }, { day: "D4", mood: 3 },
  { day: "D5", mood: 4 }, { day: "D6", mood: 5 }, { day: "D7", mood: 4 }, { day: "D8", mood: 5 },
  { day: "D9", mood: 6 }, { day: "D10", mood: 5 }, { day: "D11", mood: 6 }, { day: "D12", mood: 7 },
  { day: "D13", mood: 6 }, { day: "D14", mood: 7 },
]

const avatars = [
  { id: "a1", color: "bg-green-700", icon: "🌿" },
  { id: "a2", color: "bg-emerald-600", icon: "🍃" },
  { id: "a3", color: "bg-teal-600", icon: "🌱" },
  { id: "a4", color: "bg-sage-600", icon: "🌻" },
  { id: "a5", color: "bg-amber-700", icon: "🌙" },
  { id: "a6", color: "bg-sky-700", icon: "⭐" },
  { id: "a7", color: "bg-violet-700", icon: "🦋" },
  { id: "a8", color: "bg-rose-700", icon: "🌸" },
]

export default function ProfileOverview() {
  const [selectedAvatar, setSelectedAvatar] = useState("a1")

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="size-20 rounded-full bg-primary flex items-center justify-center text-2xl text-white font-bold">
            <span>{avatars.find((a) => a.id === selectedAvatar)?.icon || "JM"}</span>
          </div>
          <div className="relative">
            <button
              onClick={() => {
                const ids = avatars.map((a) => a.id)
                const idx = ids.indexOf(selectedAvatar)
                setSelectedAvatar(ids[(idx + 1) % ids.length])
              }}
              className="absolute -bottom-1 -right-1 size-7 rounded-full bg-white border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Change avatar"
            >
              <Camera className="size-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">Jordan M.</h2>
          <p className="text-sm text-accent font-medium">Day 14 of Recovery</p>
          <p className="text-xs text-muted-foreground">Moderate Use Program</p>
          <p className="text-xs text-muted-foreground/60">Member since May 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Days in Program", value: "14" },
          { label: "Lessons Complete", value: "3" },
          { label: "Journal Entries", value: "7" },
          { label: "Badges Earned", value: "4" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border bg-white p-4 text-center">
            <p className="text-xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-white p-4">
        <h3 className="text-sm font-semibold mb-3">Mood Trend (Last 14 Days)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={moods}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(142, 30%, 36%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(142, 30%, 36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[1, 10]} ticks={[1, 3, 5, 7, 10]} tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="mood" stroke="hsl(142, 30%, 36%)" fill="url(#moodGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Your mood has been trending upward this week</p>
      </div>
    </div>
  )
}
