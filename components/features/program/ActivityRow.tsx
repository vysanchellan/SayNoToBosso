"use client"

import { BookOpen, Wind, PenLine, HelpCircle, CheckCircle2, ArrowRight, Lock } from "lucide-react"

interface Activity {
  id: string
  type: string
  title: string
  duration: string
  completed: boolean
  prompt?: string
}

const iconMap: Record<string, { icon: typeof BookOpen; bg: string; color: string; hoverBg: string }> = {
  lesson: { icon: BookOpen, bg: "rgba(74,222,128,0.15)", color: "#4ADE80", hoverBg: "rgba(74,222,128,0.2)" },
  exercise: { icon: Wind, bg: "rgba(240,180,41,0.15)", color: "#F0B429", hoverBg: "rgba(240,180,41,0.2)" },
  journal: { icon: PenLine, bg: "rgba(94,174,234,0.15)", color: "#5EAEEA", hoverBg: "rgba(94,174,234,0.2)" },
  quiz: { icon: HelpCircle, bg: "rgba(192,140,15,0.15)", color: "#F0B429", hoverBg: "rgba(192,140,15,0.25)" },
}

export default function ActivityRow({
  activity,
  onStart,
}: {
  activity: Activity
  onStart: (a: Activity) => void
}) {
  const meta = iconMap[activity.type] || iconMap.lesson
  const Icon = meta.icon

  return (
    <div
      className={`flex items-center gap-4 rounded-xl p-3 transition-all duration-200 ${activity.completed ? "opacity-60" : "cursor-pointer"}`}
      style={{ background: activity.completed ? 'rgba(20,34,25,0.4)' : 'transparent' }}
      onClick={activity.completed ? undefined : () => onStart(activity)}
      onMouseEnter={(e) => {
        if (!activity.completed) {
          (e.currentTarget as HTMLElement).style.background = 'rgba(20,34,25,0.3)'
        }
      }}
      onMouseLeave={(e) => {
        if (!activity.completed) {
          (e.currentTarget as HTMLElement).style.background = 'transparent'
        }
      }}
    >
      <div
        className="flex size-9 items-center justify-center rounded-xl shrink-0 transition-all duration-200"
        style={{ background: meta.bg }}
        onMouseEnter={(e) => { if (!activity.completed) { (e.currentTarget as HTMLElement).style.background = meta.hoverBg } }}
        onMouseLeave={(e) => { if (!activity.completed) { (e.currentTarget as HTMLElement).style.background = meta.bg } }}
      >
        <Icon className="size-4" style={{ color: meta.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${activity.completed ? "line-through" : ""}`} style={{ color: activity.completed ? '#74917B' : '#F2F7F1' }}>
          {activity.title}
        </p>
        <span className="text-xs text-muted-foreground">{activity.duration}</span>
      </div>
      {activity.completed ? (
        <CheckCircle2 className="size-5 shrink-0" style={{ color: '#4ADE80' }} />
      ) : (
        <span className="flex items-center gap-1 text-sm font-medium shrink-0" style={{ color: '#4ADE80' }}>
          Start <ArrowRight className="size-3.5" />
        </span>
      )}
    </div>
  )
}

export function ActivityRowLocked({
  activity,
}: {
  activity: { title: string; duration: string; type: string }
}) {
  const meta = iconMap[activity.type] || iconMap.lesson
  const Icon = meta.icon

  return (
    <div className="flex items-center gap-4 rounded-xl p-3 opacity-50 cursor-not-allowed">
      <div className="flex size-9 items-center justify-center rounded-xl shrink-0" style={{ background: meta.bg }}>
        <Icon className="size-4" style={{ color: meta.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: '#74917B' }}>{activity.title}</p>
        <span className="text-xs" style={{ color: '#74917B' }}>{activity.duration}</span>
      </div>
      <Lock className="size-4 shrink-0" style={{ color: 'rgba(116,145,123,0.5)' }} />
    </div>
  )
}
