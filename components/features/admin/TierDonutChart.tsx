"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mild", value: 35, color: "hsl(152 55% 50%)" },
  { name: "Moderate", value: 48, color: "hsl(38 75% 55%)" },
  { name: "Heavy", value: 17, color: "hsl(8 65% 58%)" },
]

export default function TierDonutChart() {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'hsl(var(--card))', boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Users by Severity Tier</h3>
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
              <span className="text-lg font-bold block" style={{ color: 'hsl(var(--foreground))' }}>47</span>
              <span className="text-[9px]" style={{ color: 'hsl(var(--muted-foreground))' }}>Active Users</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span style={{ color: 'hsl(var(--muted-foreground))' }}>{d.name}</span>
              <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
