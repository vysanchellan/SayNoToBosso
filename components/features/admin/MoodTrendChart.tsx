"use client"

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"

const data = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  mood: Math.max(1, Math.min(10, 4.5 + Math.sin(i * 0.3) * 1.5 + Math.random() * 1.2)),
  craving: Math.max(1, Math.min(10, 5.5 - i * 0.08 + Math.cos(i * 0.25) * 1.2 + Math.random() * 1)),
}))

export default function MoodTrendChart() {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="text-sm font-semibold mb-4">Facility Mood &amp; Craving Trends</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 30%, 36%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(142, 30%, 36%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} interval={4} />
            <YAxis domain={[1, 10]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="mood" stroke="hsl(142, 30%, 36%)" fill="url(#moodFill)" strokeWidth={2} name="Average Mood" />
            <Area type="monotone" dataKey="craving" stroke="#E05C4B" fill="none" strokeWidth={2} name="Average Craving" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
