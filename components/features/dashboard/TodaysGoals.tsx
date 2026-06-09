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
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
            <Droplets className="size-4 text-blue-500" />
          </div>
          <span className="text-sm font-medium text-foreground">Hydration</span>
        </div>
        <button
          onClick={() => setGlasses((g) => Math.min(g + 1, goal))}
          className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
          aria-label="Add glass of water"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <div className="relative h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{glasses}/{goal} glasses</p>
    </div>
  )
}

export function BreathingGoal() {
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="rounded-xl border bg-green-50 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-5 text-green-600" />
          <span className="text-sm font-medium text-green-700">Breathing done today</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-green-100">
          <Wind className="size-4 text-green-500" />
        </div>
        <span className="text-sm font-medium text-foreground">Breathing Exercise</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">5-min session</p>
      <Button
        size="sm"
        onClick={() => setDone(true)}
        className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
      >
        Start
      </Button>
    </div>
  )
}

export function ProgramLesson() {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-amber-100">
          <BookOpen className="size-4 text-amber-500" />
        </div>
        <span className="text-sm font-medium text-foreground">Today&apos;s Lesson</span>
      </div>
      <p className="text-sm font-medium text-foreground mb-1">Anxiety &amp; The Cannabis Connection</p>
      <div className="inline-flex rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground mb-3">
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
