"use client"

import { useState } from "react"
import { AlertTriangle, AlertCircle, Info, Calendar, FileText, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const alerts = [
  {
    id: 1,
    priority: "HIGH",
    icon: AlertTriangle,
    border: "border-l-rose-500",
    bg: "bg-rose-50",
    iconColor: "text-rose-600",
    badge: "bg-rose-600",
    user: "User #A09",
    day: 6,
    tier: "Moderate",
    headline: "Repeated Crisis Tool Usage",
    details: {
      crisisCount: "3 times in past 24 hours",
      cravingAvg: "8.7/10 over last 3 days",
      note: '"I don\'t know if I can do this"',
    },
    riskFactors: [
      "Craving score >8 for 3+ consecutive days",
      "Crisis tool opened >2× in 24hrs",
      "Negative sentiment in journal/check-in notes",
    ],
    recommendations: [
      "Schedule in-person or phone check-in today",
      "Review medication plan with medical team",
      "Consider updating program pace",
    ],
  },
  {
    id: 2,
    priority: "MEDIUM",
    icon: AlertCircle,
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    badge: "bg-amber-600",
    user: "User #B15",
    day: 22,
    tier: "Heavy",
    headline: "Program Engagement Drop",
    details: {
      crisisCount: "No activity logged in 4 days",
      cravingAvg: "Week 3 stalled at 1/5 activities",
    },
    riskFactors: [
      "No activity for 4+ consecutive days",
      "Program progress stalled",
    ],
    recommendations: [
      "Send engagement prompt",
      "Schedule motivational check-in",
    ],
  },
  {
    id: 3,
    priority: "LOW",
    icon: Info,
    border: "border-l-sage-500",
    bg: "bg-sage-50",
    iconColor: "text-sage-600",
    badge: "bg-sage-600",
    user: "User #C31",
    day: 11,
    tier: "Mild",
    headline: "Persistent Low Mood",
    details: {
      crisisCount: "3 consecutive check-ins below 3/10",
    },
    riskFactors: [
      "Mood score ≤3 for 3+ consecutive days",
    ],
    recommendations: [
      "Add supportive note",
      "Review program engagement",
    ],
  },
]

const resolvedAlerts = Array.from({ length: 10 }, (_, i) => ({
  user: `#A${10 + i}`,
  type: ["Repeated Crisis Tool Usage", "Program Engagement Drop", "Persistent Low Mood", "High Craving Score", "Missed Check-ins"][i % 5],
  severity: ["HIGH", "MEDIUM", "LOW", "HIGH", "MEDIUM"][i % 5],
  resolvedBy: "Dr. Naledi Sithole",
  date: `${i + 1} Jun 2026`,
  notes: ["Schedule adjusted", "Engagement improved", "Mood stabilised", "Medication reviewed", "Check-in resumed", "Program restarted", "Crisis plan updated", "Family notified", "Counselling session booked", "Discharged from alert"][i],
}))

export default function AdminFlagsPage() {
  const [tab, setTab] = useState("All")
  const [showResolved, setShowResolved] = useState(false)

  const filtered = tab === "All" ? alerts : alerts.filter((a) => a.priority === tab)
  const highCount = alerts.filter((a) => a.priority === "HIGH").length
  const medCount = alerts.filter((a) => a.priority === "MEDIUM").length
  const lowCount = alerts.filter((a) => a.priority === "LOW").length

  return (
    <div id="main-content" className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold">Clinical Alert Flags</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white">{alerts.length} Active Alerts</span>
            <span className="text-sm text-muted-foreground">Users who may require immediate clinical attention</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 rounded-2xl border bg-white p-1 w-fit">
        {[
          { key: "All", label: `All (${alerts.length})` },
          { key: "HIGH", label: `HIGH (${highCount})` },
          { key: "MEDIUM", label: `MEDIUM (${medCount})` },
          { key: "LOW", label: `LOW (${lowCount})` },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-colors ${
              tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((alert) => (
          <div key={alert.id} className={`rounded-2xl border ${alert.border} ${alert.bg} p-5`}>
            <div className="flex items-start gap-3">
              <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${alert.badge}`}>
                <alert.icon className="size-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`rounded ${alert.badge} px-2 py-0.5 text-[10px] font-bold text-white`}>{alert.priority}</span>
                  <span className="text-sm font-semibold">{alert.headline}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{alert.user}</span>
                  <span>Day {alert.day}</span>
                  <span>·</span>
                  <span>{alert.tier} Tier</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="rounded-xl border bg-white p-3">
                <p className="text-xs font-semibold mb-2">Alert Details</p>
                {Object.entries(alert.details).map(([key, val]) => (
                  <p key={key} className="text-xs text-muted-foreground flex items-start gap-1.5 mb-1">
                    <span className="size-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                    {val}
                  </p>
                ))}
              </div>
              <div className="rounded-xl border bg-white p-3">
                <p className="text-xs font-semibold mb-2">Risk Factors</p>
                {alert.riskFactors.map((rf, i) => (
                  <p key={i} className="text-xs text-muted-foreground flex items-start gap-1.5 mb-1">
                    <span className="text-[10px] text-rose-500">☑</span>
                    {rf}
                  </p>
                ))}
              </div>
              <div className="rounded-xl border bg-white p-3">
                <p className="text-xs font-semibold mb-2">Recommended Actions</p>
                <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1">
                  {alert.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-rose-200">
              <Button className="rounded-full h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
                <Calendar className="size-3.5 mr-1" /> Schedule Check-in
              </Button>
              <Button className="rounded-full h-8 text-xs bg-white border border-muted-foreground/20 text-muted-foreground hover:bg-muted">
                <FileText className="size-3.5 mr-1" /> Add Clinical Note
              </Button>
              <Button className="rounded-full h-8 text-xs bg-amber-600 text-white hover:bg-amber-700">
                Escalate to Medical Team
              </Button>
              <Button className="rounded-full h-8 text-xs bg-white border border-muted-foreground/20 text-muted-foreground hover:bg-muted ml-auto">
                Dismiss
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => setShowResolved(!showResolved)}
          className="flex items-center gap-2 text-sm font-semibold mb-3"
        >
          Resolved Alerts ({resolvedAlerts.length})
          {showResolved ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        {showResolved && (
          <div className="rounded-2xl border bg-white overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">User ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Alert Type</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Severity</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Resolved By</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {resolvedAlerts.map((ra, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="p-3 font-medium">{ra.user}</td>
                    <td className="p-3 text-muted-foreground">{ra.type}</td>
                    <td className="p-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium ${
                        ra.severity === "HIGH" ? "bg-rose-100 text-rose-700" : ra.severity === "MEDIUM" ? "bg-amber-100 text-amber-700" : "bg-sage-100 text-sage-700"
                      }`}>{ra.severity}</span>
                    </td>
                    <td className="p-3 text-muted-foreground">{ra.resolvedBy}</td>
                    <td className="p-3 text-muted-foreground">{ra.date}</td>
                    <td className="p-3 text-muted-foreground italic">{ra.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-2xl border bg-white p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-3">Auto-Alert Rules</h3>
        <div className="space-y-2">
          {[
            { rule: "Craving score ≥8 for 3+ consecutive days", severity: "HIGH" },
            { rule: "Crisis tool opened ≥2× in 24hrs", severity: "HIGH" },
            { rule: "No activity for 3+ days", severity: "MEDIUM" },
            { rule: "Mood score ≤3 for 3+ consecutive days", severity: "LOW" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className={`size-2.5 rounded-full ${
                r.severity === "HIGH" ? "bg-rose-500" : r.severity === "MEDIUM" ? "bg-amber-500" : "bg-sage-500"
              }`} />
              <span className="text-muted-foreground flex-1">{r.rule}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                r.severity === "HIGH" ? "bg-rose-100 text-rose-700" : r.severity === "MEDIUM" ? "bg-amber-100 text-amber-700" : "bg-sage-100 text-sage-700"
              }`}>{r.severity}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 pt-3 border-t">Alert thresholds are configurable in production settings.</p>
      </div>
    </div>
  )
}
