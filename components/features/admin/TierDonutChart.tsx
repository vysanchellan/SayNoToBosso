"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mild", value: 35, color: "#6B9E78" },
  { name: "Moderate", value: 48, color: "#D4A017" },
  { name: "Heavy", value: 17, color: "#E05C4B" },
]

export default function TierDonutChart() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-sm font-semibold mb-4">Users by Severity Tier</h3>
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
              <span className="text-lg font-bold block">47</span>
              <span className="text-[9px] text-muted-foreground">Active Users</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-muted-foreground">{d.name}</span>
              <span className="font-medium">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
