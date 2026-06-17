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
  lesson: { icon: BookOpen, bg: "hsl(var(--primary) / 0.15)", color: "hsl(152 55% 65%)", hoverBg: "hsl(var(--primary) / 0.2)" },
  exercise: { icon: Wind, bg: "hsl(var(--accent) / 0.15)", color: "hsl(var(--accent))", hoverBg: "hsl(var(--accent) / 0.2)" },
  journal: { icon: PenLine, bg: "hsl(var(--secondary) / 0.15)", color: "hsl(var(--secondary))", hoverBg: "hsl(var(--secondary) / 0.2)" },
  quiz: { icon: HelpCircle, bg: "hsl(38 75% 55% / 0.15)", color: "hsl(var(--amber))", hoverBg: "hsl(38 75% 55% / 0.25)" },
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
      style={{ background: activity.completed ? 'hsl(var(--muted) / 0.4)' : 'transparent' }}
      onClick={activity.completed ? undefined : () => onStart(activity)}
      onMouseEnter={(e) => {
        if (!activity.completed) {
          (e.currentTarget as HTMLElement).style.background = 'hsl(var(--muted) / 0.3)'
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
        <p className={`text-sm font-medium truncate ${activity.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
          {activity.title}
        </p>
        <span className="text-xs text-muted-foreground">{activity.duration}</span>
      </div>
      {activity.completed ? (
        <CheckCircle2 className="size-5 shrink-0" style={{ color: 'hsl(var(--primary))' }} />
      ) : (
        <span className="flex items-center gap-1 text-sm font-medium shrink-0" style={{ color: 'hsl(var(--primary))' }}>
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
        <p className="text-sm font-medium text-muted-foreground truncate">{activity.title}</p>
        <span className="text-xs text-muted-foreground">{activity.duration}</span>
      </div>
      <Lock className="size-4 text-muted-foreground/50 shrink-0" />
    </div>
  )
}
