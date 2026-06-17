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
    <div className="rounded-2xl p-5" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#F2F7F1' }}>Weekly Program Completion Rates</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F3326" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#74917B' }} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#74917B' }} tickLine={false} axisLine={false} unit="%" />
            <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: '#142219', border: '1px solid #2A4534', borderRadius: '8px' }} />
            <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.current ? "#F0B429" : "#2A4534"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.25)' }}>
        <p className="text-xs" style={{ color: '#F0B429' }}>
          <strong>Insight:</strong> Dropout spikes between Week 3-4. Consider scheduling a clinical check-in at this point.
        </p>
      </div>
    </div>
  )
}
