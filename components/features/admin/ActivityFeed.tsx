"use client"

import { useState } from "react"
import { CheckCircle, Award, BookOpen, AlertTriangle, PenSquare } from "lucide-react"

const events = [
  { type: "checkin", icon: CheckCircle, label: "User #A14 completed daily check-in", time: "12 min ago" },
  { type: "milestone", icon: Award, label: "User #B07 earned '14 Days' badge", time: "1 hr ago" },
  { type: "lesson", icon: BookOpen, label: "User #C22 completed Week 2 Lesson 3", time: "2 hrs ago" },
  { type: "crisis", icon: AlertTriangle, label: "User #A09 opened crisis support tool", time: "3 hrs ago" },
  { type: "journal", icon: PenSquare, label: "User #D33 submitted 3 journal entries today", time: "4 hrs ago" },
  { type: "checkin", icon: CheckCircle, label: "User #E05 completed daily check-in", time: "5 hrs ago" },
  { type: "milestone", icon: Award, label: "User #F12 earned 'Fortnight Free' badge", time: "6 hrs ago" },
  { type: "lesson", icon: BookOpen, label: "User #G08 started Week 4 Lesson 1", time: "7 hrs ago" },
]

const filters = ["All", "Check-in", "Milestone", "Lesson", "Crisis", "Journal"]

const eventStyles: Record<string, { bg: string; iconColor: string }> = {
  checkin: { bg: 'hsl(145 30% 48% / 0.15)', iconColor: 'hsl(145 40% 60%)' },
  milestone: { bg: 'hsl(42 75% 55% / 0.15)', iconColor: 'hsl(42 75% 65%)' },
  lesson: { bg: 'hsl(210 55% 48% / 0.15)', iconColor: 'hsl(210 55% 65%)' },
  crisis: { bg: 'hsl(8 65% 58% / 0.15)', iconColor: 'hsl(8 65% 68%)' },
  journal: { bg: 'hsl(280 40% 55% / 0.15)', iconColor: 'hsl(280 40% 70%)' },
}

export default function ActivityFeed() {
  const [filter, setFilter] = useState("All")
  const [count, setCount] = useState(5)

  const filtered = filter === "All" ? events : events.filter((e) => {
    if (filter === "Check-in") return e.type === "checkin"
    if (filter === "Milestone") return e.type === "milestone"
    if (filter === "Lesson") return e.type === "lesson"
    if (filter === "Crisis") return e.type === "crisis"
    if (filter === "Journal") return e.type === "journal"
    return true
  })

  return (
    <div className="rounded-2xl border bg-card p-5" style={{ borderColor: 'hsl(var(--border))' }}>
      <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
      <div className="flex gap-1.5 overflow-x-auto mb-4" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
              filter === f
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={filter === f ? { background: 'hsl(var(--sage-light))', color: 'hsl(var(--forest))' } : {}}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-0">
        {filtered.slice(0, count).map((ev, i) => {
          const es = eventStyles[ev.type] || eventStyles.checkin
          return (
            <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0" style={{ borderColor: 'hsl(var(--border) / 0.5)' }}>
              <div className="size-8 rounded-full flex items-center justify-center shrink-0" style={{ background: es.bg }}>
                <ev.icon className="size-4" style={{ color: es.iconColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{ev.label}</p>
                <p className="text-xs text-muted-foreground">{ev.time}</p>
              </div>
            </div>
          )
        })}
      </div>
      {count < filtered.length && (
        <button
          onClick={() => setCount((c) => c + 5)}
          className="mt-4 w-full rounded-lg border py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
          style={{ borderColor: 'hsl(var(--border))' }}
        >
          Load More
        </button>
      )}
    </div>
  )
}
