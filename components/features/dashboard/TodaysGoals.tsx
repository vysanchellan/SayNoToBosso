"use client"

import { useState } from "react"
import { Droplets, Wind, BookOpen, Plus, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HydrationGoal() {
  const [glasses, setGlasses] = useState(4)
  const goal = 8
  const percent = (glasses / goal) * 100

  return (
    <div className="rounded-xl bg-card p-4" style={{ boxShadow: '0 0 0 1px hsl(var(--border)/0.4)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl" style={{ background: 'hsl(200 55% 48%/0.15)' }}>
            <Droplets className="size-4" style={{ color: 'hsl(200 55% 65%)' }} />
          </div>
          <span className="text-sm font-semibold text-foreground">Hydration</span>
        </div>
        <button
          onClick={() => setGlasses((g) => Math.min(g + 1, goal))}
          className="flex size-7 items-center justify-center rounded-lg transition-colors"
          style={{ background: 'hsl(var(--muted))' }}
          aria-label="Add glass of water"
        >
          <Plus className="size-3.5 text-muted-foreground" />
        </button>
      </div>
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(var(--muted))' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, background: 'hsl(200 55% 52%)' }}
        />
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">{glasses}/{goal} glasses</p>
    </div>
  )
}

export function BreathingGoal() {
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="rounded-xl p-4" style={{ background: 'hsl(var(--primary)/0.1)', boxShadow: '0 0 0 1px hsl(var(--primary)/0.2)' }}>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-5" style={{ color: 'hsl(152 55% 60%)' }} />
          <span className="text-sm font-medium text-foreground">Breathing done today</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-card p-4" style={{ boxShadow: '0 0 0 1px hsl(var(--border)/0.4)' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex size-9 items-center justify-center rounded-xl" style={{ background: 'hsl(var(--primary)/0.15)' }}>
          <Wind className="size-4" style={{ color: 'hsl(152 55% 65%)' }} />
        </div>
        <span className="text-sm font-semibold text-foreground">Breathing Exercise</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">5-min session</p>
      <Button
        size="sm"
        onClick={() => setDone(true)}
        className="w-full rounded-full text-xs font-semibold"
        style={{ background: 'hsl(var(--primary)/0.15)', color: 'hsl(152 55% 65%)' }}
      >
        Start
      </Button>
    </div>
  )
}

export function ProgramLesson() {
  return (
    <div className="rounded-xl bg-card p-4" style={{ boxShadow: '0 0 0 1px hsl(var(--border)/0.4)' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex size-9 items-center justify-center rounded-xl" style={{ background: 'hsl(38 75% 48%/0.15)' }}>
          <BookOpen className="size-4" style={{ color: 'hsl(38 75% 65%)' }} />
        </div>
        <span className="text-sm font-semibold text-foreground">Today&apos;s Lesson</span>
      </div>
      <p className="text-sm font-medium text-foreground mb-1">Anxiety &amp; The Cannabis Connection</p>
      <div className="inline-flex rounded-full px-2 py-0.5 text-[10px] mb-3" style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
        15 min read
      </div>
      <Link href="/program">
        <Button
          size="sm"
          variant="outline"
          className="w-full rounded-full text-xs"
        >
          Continue
        </Button>
      </Link>
    </div>
  )
}
