"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts"

const data = [
  { week: "W1", pct: 95, users: 45 },
  { week: "W2", pct: 88, users: 41 },
  { week: "W3", pct: 73, users: 34, current: true },
  { week: "W4", pct: 60, users: 28 },
  { week: "W5", pct: 52, users: 24 },
  { week: "W6", pct: 44, users: 21 },
  { week: "W7", pct: 38, users: 18 },
  { week: "W8", pct: 32, users: 15 },
  { week: "W9", pct: 20, users: 9 },
  { week: "W10", pct: 8, users: 4 },
]

export default function ProgramProgressTable() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-sm font-semibold mb-4">Weekly Program Completion Rates</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 10%, 90%)" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} tickLine={false} axisLine={false} unit="%" />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.current ? "hsl(42, 82%, 48%)" : "hsl(142, 30%, 36%)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3">
        <p className="text-xs text-amber-800">
          <strong>Insight:</strong> Dropout spikes between Week 3-4. Consider scheduling a clinical check-in at this point.
        </p>
      </div>
    </div>
  )
}
