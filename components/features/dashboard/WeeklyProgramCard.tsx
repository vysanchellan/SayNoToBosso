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
      className="relative overflow-hidden rounded-2xl p-6"
      style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326', borderLeft: '3px solid #4ADE80' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
          style={{ backgroundColor: 'rgba(240,180,41,0.15)', color: '#F0B429' }}
        >
          <span className="size-1.5 rounded-full bg-current" />
          Week 2
        </span>
        <span className="text-xs" style={{ color: '#74917B' }}>{completed} of {total} activities complete</span>
      </div>

      <h3 className="text-xl font-bold mt-2" style={{ color: '#4ADE80' }}>Brain Reset</h3>

      <div className="relative h-2 rounded-full overflow-hidden mt-3 mb-4" style={{ backgroundColor: '#1F3326' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(completed / total) * 100}%`,
            background: 'linear-gradient(90deg, #4ADE80 0%, #F0B429 100%)',
          }}
        />
      </div>

      <ul className="space-y-2 mb-4">
        {activities.map((a) => (
          <li key={a.label} className="flex items-center gap-3 py-2 text-sm">
            {a.done ? (
              <CheckCircle2 className="size-4 shrink-0" style={{ color: '#4ADE80' }} />
            ) : a.inProgress ? (
              <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#F0B429' }} />
                <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: '#F0B429' }} />
              </div>
            ) : (
              <div className="size-4 shrink-0 rounded-full" style={{ border: '2px solid #2A4534' }} />
            )}
            <span
              className="flex-1"
              style={{
                color: a.done ? '#74917B' : a.inProgress ? '#F0B429' : '#74917B',
                textDecoration: a.done ? 'line-through' : 'none',
                fontWeight: a.inProgress ? 600 : 400,
              }}
            >
              {a.label}
            </span>
            {a.isToday && (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}>
                Today
              </span>
            )}
          </li>
        ))}
      </ul>

      <Link href="/program">
        <Button
          className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #1E6B3F 0%, #4ADE80 100%)', color: '#07100B' }}
        >
          Continue Program
        </Button>
      </Link>
    </div>
  )
}
