"use client"

import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Check, Lock, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ActivityRow, { ActivityRowLocked } from "./ActivityRow"

interface Activity {
  id: string
  type: string
  title: string
  duration: string
  completed: boolean
  prompt?: string
}

interface WeekData {
  weekNumber: number
  title: string
  theme: string
  color: string
  unlocked: boolean
  completed: boolean
  activities: Activity[]
}

export default function WeekCard({
  week,
  onStartActivity,
}: {
  week: WeekData
  onStartActivity: (activity: Activity) => void
}) {
  const [expanded, setExpanded] = useState(week.weekNumber <= 2)
  const activitiesRef = useRef<HTMLDivElement>(null)

  const handleContinueWeek = useCallback(() => {
    setExpanded(true)
    setTimeout(() => {
      activitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }, [])

  const completedCount = week.activities.filter((a) => a.completed).length
  const totalActivities = week.activities.length
  const isComplete = completedCount === totalActivities
  const isUnlocked = week.unlocked

  const progressPercent = (completedCount / totalActivities) * 100

  return (
    <div
      className="rounded-2xl transition-all"
      style={{
        background: 'hsl(var(--card))',
        boxShadow: isComplete
          ? '0 0 0 1px hsl(var(--primary) / 0.3), 0 0 0 1px hsl(var(--primary) / 0.2)'
          : isUnlocked && expanded
            ? '0 0 0 1px hsl(var(--primary) / 0.4)'
            : '0 0 0 1px hsl(var(--border) / 0.4)',
      }}
    >
      <button
        onClick={() => isUnlocked && setExpanded(!expanded)}
        className="flex w-full items-center gap-4 p-4 text-left"
        aria-expanded={expanded}
        aria-label={`Week ${week.weekNumber}: ${week.title}`}
      >
        <div
          className={`size-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
            isComplete
              ? "text-white"
              : isUnlocked
                ? "text-primary-foreground"
                : "text-muted-foreground"
          }`}
          style={{
            background: isComplete
              ? 'hsl(var(--primary))'
              : isUnlocked
                ? 'hsl(var(--primary))'
                : 'hsl(var(--muted))',
          }}
        >
          {isComplete ? (
            <Check className="size-4" />
          ) : isUnlocked ? (
            <span>{week.weekNumber}</span>
          ) : (
            <Lock className="size-4" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-semibold ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
            Week {week.weekNumber}: {week.title}
          </h3>
          {isUnlocked && <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">{week.theme}</p>}
        </div>

        {isUnlocked && (
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>{completedCount}/{totalActivities}</span>
            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progressPercent}%`, background: isComplete ? 'hsl(var(--primary))' : 'hsl(var(--primary))' }}
              />
            </div>
          </div>
        )}

        {isUnlocked && (
          <div className="shrink-0 text-muted-foreground">
            {expanded ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
          </div>
        )}
      </button>

      {isUnlocked && expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="px-4 py-3 space-y-1" style={{ borderTop: '1px solid hsl(var(--border) / 0.4)' }}>
            {week.activities.map((activity) =>
              week.unlocked ? (
                <ActivityRow
                  key={activity.id}
                  activity={activity}
                  onStart={onStartActivity}
                />
              ) : (
                <ActivityRowLocked key={activity.id} activity={activity} />
              )
            )}
          </div>

          <div className="px-4 py-3" style={{ borderTop: '1px solid hsl(var(--border) / 0.4)' }}>
            {isComplete ? (
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'hsl(var(--primary))' }}>
                <Check className="size-4" />
                Week Complete
              </div>
            ) : (
              <Button
                onClick={handleContinueWeek}
                className="w-full rounded-full text-sm text-white"
                style={{ background: 'hsl(var(--primary))' }}
              >
                {completedCount === 0 ? "Start Week" : "Continue Week"}
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {!isUnlocked && (
        <div className="px-4 py-3" style={{ borderTop: '1px solid hsl(var(--border) / 0.4)' }}>
          <p className="text-xs text-muted-foreground text-center">
            Complete Week {week.weekNumber - 1} to unlock
          </p>
        </div>
      )}
    </div>
  )
}
