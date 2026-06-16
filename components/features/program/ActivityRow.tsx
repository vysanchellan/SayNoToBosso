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
    <div className={`flex items-center gap-4 rounded-xl p-3 transition-colors ${activity.completed ? "bg-muted/40 opacity-70" : "bg-card hover:bg-muted/30 cursor-pointer"}`}
      onClick={activity.completed ? undefined : () => onStart(activity)}
    >
      <div className={`size-8 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}>
        <Icon className={`size-4 ${meta.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${activity.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
          {activity.title}
        </p>
        <span className="text-xs text-muted-foreground">{activity.duration}</span>
      </div>
      {activity.completed ? (
        <CheckCircle2 className="size-5 text-green-600 shrink-0" />
      ) : (
        <span className="flex items-center gap-1 text-sm font-medium text-primary shrink-0">
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
      <div className={`size-8 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}>
        <Icon className={`size-4 ${meta.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground truncate">{activity.title}</p>
        <span className="text-xs text-muted-foreground">{activity.duration}</span>
      </div>
      <Lock className="size-4 text-muted-foreground/50 shrink-0" />
    </div>
  )
}
