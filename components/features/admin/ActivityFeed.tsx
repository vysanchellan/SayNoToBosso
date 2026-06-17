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
  checkin: { bg: 'rgba(74,222,128,0.15)', iconColor: '#4ADE80' },
  milestone: { bg: 'rgba(240,180,41,0.15)', iconColor: '#F0B429' },
  lesson: { bg: 'rgba(94,174,234,0.15)', iconColor: '#5EAEEA' },
  crisis: { bg: 'rgba(248,113,113,0.15)', iconColor: '#F87171' },
  journal: { bg: 'rgba(180,130,210,0.15)', iconColor: '#B482D2' },
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
    <div className="rounded-2xl p-5" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#F2F7F1' }}>Recent Activity</h3>
      <div className="flex gap-1.5 overflow-x-auto mb-4" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors"
            style={
              filter === f
                ? { backgroundColor: '#142219', color: '#F2F7F1' }
                : { color: '#74917B' }
            }
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-0">
        {filtered.slice(0, count).map((ev, i) => {
          const es = eventStyles[ev.type] || eventStyles.checkin
          return (
            <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0" style={{ borderColor: 'rgba(31,51,38,0.5)' }}>
              <div className="size-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: es.bg }}>
                <ev.icon className="size-4" style={{ color: es.iconColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: '#F2F7F1' }}>{ev.label}</p>
                <p className="text-xs" style={{ color: '#74917B' }}>{ev.time}</p>
              </div>
            </div>
          )
        })}
      </div>
      {count < filtered.length && (
        <button
          onClick={() => setCount((c) => c + 5)}
          className="mt-4 w-full rounded-lg border py-2 text-xs transition-colors"
          style={{ borderColor: '#1F3326', color: '#74917B' }}
        >
          Load More
        </button>
      )}
    </div>
  )
}
