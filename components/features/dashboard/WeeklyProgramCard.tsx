import { Button } from "@/components/ui/button"
import Link from "next/link"

const activities = [
  { label: "Introduction to Week 2", done: true },
  { label: "Anxiety & Cannabis", done: true },
  { label: "Sleep Hygiene Science", done: true, isToday: true },
  { label: "Guided Breathing Session", done: false, inProgress: true },
  { label: "Week 2 Journal Prompt", done: false },
]

export default function WeeklyProgramCard() {
  const completed = activities.filter((a) => a.done).length
  const total = activities.length

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
          Week 2
        </div>
        <span className="text-xs text-muted-foreground">{completed} of {total} activities complete</span>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-1">Brain Reset</h3>

      <div className="relative h-2 rounded-full bg-muted mb-4">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>

      <ul className="space-y-2 mb-4">
        {activities.map((a) => (
          <li key={a.label} className="flex items-center gap-3">
            <div
              className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                a.done
                  ? "border-green-400 bg-green-50"
                  : a.inProgress
                    ? "border-accent bg-accent/10"
                    : "border-muted-foreground/30"
              }`}
            >
              {a.done ? (
                <span className="text-[10px] text-green-500 font-bold">&#10003;</span>
              ) : a.inProgress ? (
                <span className="size-2 rounded-full bg-accent" />
              ) : null}
            </div>
            <span
              className={`text-sm ${
                a.done
                  ? "text-muted-foreground line-through"
                  : a.inProgress
                    ? "text-accent font-medium"
                    : "text-foreground"
              }`}
            >
              {a.label}
            </span>
            {a.isToday && (
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">Today</span>
            )}
          </li>
        ))}
      </ul>

      <Link href="/program">
        <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          Continue Program
        </Button>
      </Link>
    </div>
  )
}
