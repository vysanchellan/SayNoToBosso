"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mild", value: 35, color: "#4ADE80" },
  { name: "Moderate", value: 48, color: "#F0B429" },
  { name: "Heavy", value: 17, color: "#F87171" },
]

export default function TierDonutChart() {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#F2F7F1' }}>Users by Severity Tier</h3>
      <div className="flex flex-col items-center">
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-center">
              <span className="text-3xl font-bold block" style={{ color: '#F2F7F1' }}>47</span>
              <span className="text-xs" style={{ color: '#74917B' }}>Active Users</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span style={{ color: '#B9D0BE' }}>{d.name}</span>
              <span className="font-semibold" style={{ color: '#F2F7F1' }}>{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
