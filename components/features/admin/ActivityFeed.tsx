"use client"

import { useState } from "react"
import { CheckCircle, Award, BookOpen, AlertTriangle, PenSquare } from "lucide-react"

const events = [
  { type: "checkin", icon: CheckCircle, color: "text-green-600 bg-green-100", label: "User #A14 completed daily check-in", time: "12 min ago" },
  { type: "milestone", icon: Award, color: "text-amber-600 bg-amber-100", label: "User #B07 earned '14 Days' badge", time: "1 hr ago" },
  { type: "lesson", icon: BookOpen, color: "text-blue-600 bg-blue-100", label: "User #C22 completed Week 2 Lesson 3", time: "2 hrs ago" },
  { type: "crisis", icon: AlertTriangle, color: "text-rose-600 bg-rose-100", label: "User #A09 opened crisis support tool", time: "3 hrs ago" },
  { type: "journal", icon: PenSquare, color: "text-purple-600 bg-purple-100", label: "User #D33 submitted 3 journal entries today", time: "4 hrs ago" },
  { type: "checkin", icon: CheckCircle, color: "text-green-600 bg-green-100", label: "User #E05 completed daily check-in", time: "5 hrs ago" },
  { type: "milestone", icon: Award, color: "text-amber-600 bg-amber-100", label: "User #F12 earned 'Fortnight Free' badge", time: "6 hrs ago" },
  { type: "lesson", icon: BookOpen, color: "text-blue-600 bg-blue-100", label: "User #G08 started Week 4 Lesson 1", time: "7 hrs ago" },
]

const filters = ["All", "Check-in", "Milestone", "Lesson", "Crisis", "Journal"]

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
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
      <div className="flex gap-1.5 overflow-x-auto mb-4" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.slice(0, count).map((ev, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`size-7 rounded-full flex items-center justify-center shrink-0 ${ev.color}`}>
              <ev.icon className="size-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{ev.label}</p>
              <p className="text-[10px] text-muted-foreground">{ev.time}</p>
            </div>
          </div>
        ))}
      </div>
      {count < filtered.length && (
        <button
          onClick={() => setCount((c) => c + 5)}
          className="mt-4 w-full rounded-lg border border-muted-foreground/20 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
        >
          Load More
        </button>
      )}
    </div>
  )
}
