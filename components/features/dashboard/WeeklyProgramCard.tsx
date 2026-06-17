import { CheckCircle2 } from "lucide-react"
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
      className="relative overflow-hidden rounded-2xl bg-card p-5"
      style={{ borderLeft: '3px solid hsl(var(--accent))', boxShadow: '0 0 0 1px hsl(var(--border)/0.4)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
          style={{ background: 'hsl(38 75% 48%/0.15)', color: 'hsl(38 75% 65%)' }}
        >
          <span className="size-1.5 rounded-full bg-current" />
          Week 2
        </span>
        <span className="text-xs text-muted-foreground">{completed} of {total} activities complete</span>
      </div>

      <h3 className="text-xl font-bold mt-2" style={{ color: 'hsl(152 55% 65%)' }}>Brain Reset</h3>

      <div className="relative h-2 rounded-full overflow-hidden mt-3 mb-4" style={{ background: 'hsl(var(--muted))' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(completed / total) * 100}%`,
            background: 'linear-gradient(90deg, hsl(155 50% 32%), hsl(38 75% 48%))',
          }}
        />
      </div>

      <ul className="space-y-2 mb-4">
        {activities.map((a) => (
          <li key={a.label} className="flex items-center gap-3 py-2 text-sm">
            {a.done ? (
              <CheckCircle2 className="size-4 shrink-0" style={{ color: 'hsl(152 55% 60%)' }} />
            ) : a.inProgress ? (
              <div className="size-4 shrink-0 rounded-full flex items-center justify-center" style={{ background: 'hsl(38 75% 48%)' }}>
                <span className="size-1.5 rounded-full bg-white" />
              </div>
            ) : (
              <div className="size-4 shrink-0 rounded-full" style={{ border: '2px solid hsl(var(--border))' }} />
            )}
            <span
              className="flex-1"
              style={{
                color: a.done ? 'hsl(var(--muted-foreground))' : a.inProgress ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                textDecoration: a.done ? 'line-through' : 'none',
                fontWeight: a.inProgress ? 600 : 400,
              }}
            >
              {a.label}
            </span>
            {a.isToday && (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'hsl(var(--primary)/0.15)', color: 'hsl(152 55% 65%)' }}>
                Today
              </span>
            )}
          </li>
        ))}
      </ul>

      <Link href="/program">
        <Button
          className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.99]"
          style={{ background: 'hsl(var(--primary))', color: 'white' }}
        >
          Continue Program
        </Button>
      </Link>
    </div>
  )
}
