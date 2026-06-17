"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", mood: 6.5, craving: 4 },
  { day: "Tue", mood: 7.2, craving: 3 },
  { day: "Wed", mood: 5.8, craving: 6 },
  { day: "Thu", mood: 8.1, craving: 2 },
  { day: "Fri", mood: 7.5, craving: 3 },
  { day: "Sat", mood: 8.8, craving: 1 },
  { day: "Sun", mood: 9.2, craving: 1 },
]

export default function MoodTrendChart() {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#F2F7F1' }}>Mood & Craving Trends</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#1F3326" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#74917B" tick={{ fill: '#74917B', fontSize: 12 }} />
            <YAxis stroke="#74917B" tick={{ fill: '#74917B', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#142219', border: '1px solid #2A4534', borderRadius: '12px' }}
              labelStyle={{ color: '#F2F7F1' }}
              itemStyle={{ color: '#B9D0BE' }}
            />
            <Line type="monotone" dataKey="mood" stroke="#4ADE80" strokeWidth={2} dot={false} name="Average Mood" />
            <Line type="monotone" dataKey="craving" stroke="#F87171" strokeWidth={2} dot={false} name="Average Craving" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
