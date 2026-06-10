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
    <div
      className="relative overflow-hidden rounded-2xl border bg-card p-5"
      style={{ borderLeft: '3px solid hsl(var(--accent))', borderColor: 'hsl(var(--border))' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--accent) / 0.15), hsl(var(--accent) / 0.05))',
            color: 'hsl(var(--accent))',
            border: '1px solid hsl(var(--accent) / 0.2)',
          }}
        >
          <span className="size-1.5 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
          Week 2
        </span>
        <span className="text-xs text-muted-foreground">{completed} of {total} activities complete</span>
      </div>

      <h3 className="text-lg font-display font-semibold" style={{ color: 'hsl(var(--forest))' }}>Brain Reset</h3>

      <div className="relative h-2 rounded-full overflow-hidden mt-3 mb-4" style={{ background: 'hsl(var(--muted))' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(completed / total) * 100}%`,
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
          }}
        />
      </div>

      <ul className="space-y-2 mb-4">
        {activities.map((a) => (
          <li key={a.label} className="flex items-center gap-3">
            <div
              className="flex size-5 shrink-0 items-center justify-center rounded-full"
              style={{
                border: `1.5px solid ${
                  a.done
                    ? 'hsl(var(--sage))'
                    : a.inProgress
                      ? 'hsl(var(--accent))'
                      : 'hsl(var(--muted-foreground) / 0.3)'
                }`,
                background: a.done ? 'hsl(var(--sage-light))' : a.inProgress ? 'hsl(var(--accent) / 0.1)' : 'transparent',
              }}
            >
              {a.done ? (
                <span className="text-[10px] font-bold" style={{ color: 'hsl(var(--sage))' }}>&#10003;</span>
              ) : a.inProgress ? (
                <span className="size-2 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              ) : null}
            </div>
            <span
              className="text-sm flex-1"
              style={{
                color: a.done ? 'hsl(var(--muted-foreground))' : a.inProgress ? 'hsl(var(--accent))' : 'hsl(var(--foreground))',
                textDecoration: a.done ? 'line-through' : 'none',
                fontWeight: a.inProgress ? 500 : 400,
              }}
            >
              {a.label}
            </span>
            {a.isToday && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  background: 'hsl(var(--primary) / 0.1)',
                  color: 'hsl(var(--primary))',
                }}
              >
                Today
              </span>
            )}
          </li>
        ))}
      </ul>

      <Link href="/program">
        <Button
          className="w-full rounded-full font-semibold"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--forest-mid)))',
            color: 'hsl(var(--primary-foreground))',
          }}
        >
          Continue Program
        </Button>
      </Link>
    </div>
  )
}
