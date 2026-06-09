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

const iconMap: Record<string, { icon: typeof BookOpen; color: string; bg: string }> = {
  lesson: { icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
  exercise: { icon: Wind, color: "text-secondary", bg: "bg-secondary/15" },
  journal: { icon: PenLine, color: "text-accent", bg: "bg-accent/15" },
  quiz: { icon: HelpCircle, color: "text-amber-500", bg: "bg-amber-100" },
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
    <div className={`flex items-center gap-4 rounded-xl p-3 transition-colors ${activity.completed ? "opacity-60" : "hover:bg-muted/50"}`}>
      <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
        <Icon className={`size-5 ${meta.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${activity.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
          {activity.title}
        </p>
        <span className="text-xs text-muted-foreground">{activity.duration}</span>
      </div>
      {activity.completed ? (
        <CheckCircle2 className="size-5 text-green-500 shrink-0" />
      ) : (
        <button
          onClick={() => onStart(activity)}
          className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors shrink-0"
          aria-label={`Start ${activity.title}`}
        >
          Start <ArrowRight className="size-3" />
        </button>
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
    <div className="flex items-center gap-4 rounded-xl p-3 opacity-40">
      <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
        <Icon className={`size-5 ${meta.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground truncate">{activity.title}</p>
        <span className="text-xs text-muted-foreground">{activity.duration}</span>
      </div>
      <Lock className="size-4 text-muted-foreground/50 shrink-0" />
    </div>
  )
}
