"use client"

import { useState } from "react"
import {
  ComposedChart, Area, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, Legend,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Download, FileText, Loader2 } from "lucide-react"
import { toast } from "sonner"

const metricCards = [
  { label: "Avg days to first milestone", value: "8.2 days", before: "—", after: "8.2 days", change: "" },
  { label: "% completing Week 4", value: "60%", before: "—", after: "60%", change: "" },
  { label: "Mood improvement (admission → 30d)", value: "+34%", before: "4.1", after: "5.5", change: "+34%" },
  { label: "Avg craving reduction by Week 6", value: "−61%", before: "8.2", after: "3.2", change: "−61%" },
]

const moodData = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  mood: 4.5 + Math.sin(i * 0.5) * 1.2 + i * 0.15,
  craving: 6.5 - i * 0.35 + Math.cos(i * 0.4) * 0.8,
}))

const toolData = [
  { name: "Daily Check-in", pct: 91 },
  { name: "Hydration", pct: 82 },
  { name: "Breathing", pct: 78 },
  { name: "Sleep Log", pct: 67 },
  { name: "Journal", pct: 54 },
  { name: "Research Library", pct: 43 },
  { name: "Movement", pct: 38 },
  { name: "Mindfulness", pct: 29 },
]

const funnelData = [
  { week: "Start", pct: 100, enrolled: 47 },
  { week: "W1", pct: 95, enrolled: 45 },
  { week: "W2", pct: 88, enrolled: 41 },
  { week: "W3", pct: 73, enrolled: 34 },
  { week: "W4", pct: 60, enrolled: 28 },
  { week: "W5", pct: 52, enrolled: 24 },
  { week: "W6", pct: 44, enrolled: 21 },
  { week: "W7", pct: 38, enrolled: 18 },
  { week: "W8", pct: 32, enrolled: 15 },
  { week: "W9", pct: 20, enrolled: 9 },
  { week: "W10", pct: 8, enrolled: 4 },
]

const summaryRows = Array.from({ length: 10 }, (_, i) => ({
  week: `Week ${i + 1}`,
  enrolled: Math.round(47 * (1 - i * 0.09)),
  started: Math.round(47 * (1 - i * 0.08)),
  completed: Math.round(47 * funnelData[i + 1]?.pct / 100),
  rate: funnelData[i + 1]?.pct ?? 0,
  avgMood: (4.5 + Math.sin(i * 0.5) * 0.8).toFixed(1),
  avgCraving: (6.5 - i * 0.3).toFixed(1),
}))

function getToolColor(pct: number) {
  if (pct >= 70) return "hsl(142, 30%, 36%)"
  if (pct >= 50) return "hsl(42, 82%, 48%)"
  return "hsl(4, 72%, 58%)"
}

export default function AdminReportsPage() {
  const [range, setRange] = useState("30")
  const [generating, setGenerating] = useState(false)

  const handleGeneratePDF = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      toast.success("Report generated. Download would begin in production.")
    }, 1500)
  }

  return (
    <div id="main-content" className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold">Clinical Progress Reports</h1>
          <p className="text-sm text-muted-foreground">White River Manor Recovery Centre</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border overflow-hidden" style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}>
            {["7", "30", "90", "custom"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {r === "custom" ? "Custom" : `${r}d`}
              </button>
            ))}
          </div>
          <Button
            onClick={handleGeneratePDF}
            disabled={generating}
            className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {generating ? <Loader2 className="size-4 mr-1 animate-spin" /> : <FileText className="size-4 mr-1" />}
            {generating ? "Generating..." : "Generate PDF Report"}
          </Button>
          <Button className="rounded-full bg-card border border-muted-foreground/20 text-muted-foreground hover:bg-muted">
            <Download className="size-4 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

      <section>
        <h2 className="text-sm font-semibold mb-3">Recovery Outcomes Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((m) => (
            <div key={m.label} className="rounded-2xl border bg-card p-4">
              <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              {m.change && (
                <div className="flex items-center gap-2 mt-2 text-[10px]">
                  <span className="text-muted-foreground">From {m.before}</span>
                  <span className="text-green-600 font-medium">→ {m.after}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3">Mood &amp; Craving Trends (Facility-Wide)</h2>
        <div className="rounded-2xl border bg-card p-5">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={moodData}>
                <defs>
                  <linearGradient id="reportMoodFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142, 30%, 36%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(142, 30%, 36%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 10%, 90%)" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="mood" stroke="hsl(142, 30%, 36%)" fill="url(#reportMoodFill)" strokeWidth={2} name="Avg Mood" />
                <Line type="monotone" dataKey="craving" stroke="#E05C4B" strokeWidth={2} name="Avg Craving" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3">Tool Engagement Rates</h2>
        <div className="rounded-2xl border bg-card p-5">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={toolData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 10%, 90%)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} tickLine={false} axisLine={false} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} tickLine={false} axisLine={false} width={100} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                  {toolData.map((d, i) => (
                    <Cell key={i} fill={getToolColor(d.pct)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 rounded-xl bg-blue-50 border border-blue-200 p-3">
            <p className="text-xs text-blue-800">
              <strong>Insight:</strong> Daily check-in has highest engagement (91%). Consider using it to prompt engagement with lower-performing tools.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3">Program Week Funnel</h2>
        <div className="rounded-2xl border bg-card p-5">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 10%, 90%)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(40, 20%, 50%)" }} tickLine={false} axisLine={false} unit="%" />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                  {funnelData.map((d, i) => (
                    <Cell key={i} fill={`hsla(142, 30%, ${30 + (d.pct / 100) * 25}%, ${0.3 + (d.pct / 100) * 0.5})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs text-amber-800">
              <strong>Drop-off point:</strong> Highest dropout occurs between Week 3 (73%) and Week 4 (60%). Clinical check-in recommended at this stage.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3">Weekly Summary Table</h2>
        <div className="rounded-2xl border bg-card overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-3 font-medium text-muted-foreground">Week</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Enrolled</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Started</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Completed</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Completion Rate</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Avg Mood</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Avg Craving</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row, i) => (
                <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-muted/10"}`}>
                  <td className="p-3 font-medium">{row.week}</td>
                  <td className="p-3">{row.enrolled}</td>
                  <td className="p-3">{row.started}</td>
                  <td className="p-3">{row.completed}</td>
                  <td className="p-3">
                    <span className={`font-medium ${row.rate >= 60 ? "text-green-600" : row.rate >= 30 ? "text-amber-600" : "text-rose-600"}`}>
                      {row.rate}%
                    </span>
                  </td>
                  <td className="p-3">{row.avgMood}</td>
                  <td className="p-3">{row.avgCraving}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
