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
    <div className="rounded-xl p-4" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(94,174,234,0.15)' }}>
            <Droplets className="size-4" style={{ color: '#5EAEEA' }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: '#F2F7F1' }}>Hydration</span>
        </div>
        <button
          onClick={() => setGlasses((g) => Math.min(g + 1, goal))}
          className="flex size-7 items-center justify-center rounded-lg transition-colors"
          style={{ backgroundColor: '#142219' }}
          aria-label="Add glass of water"
        >
          <Plus className="size-3.5" style={{ color: '#74917B' }} />
        </button>
      </div>
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#142219' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: '#5EAEEA' }}
        />
      </div>
      <p className="mt-1.5 text-xs" style={{ color: '#74917B' }}>{glasses}/{goal} glasses</p>
    </div>
  )
}

export function BreathingGoal() {
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(74,222,128,0.1)', boxShadow: '0 0 0 1px rgba(74,222,128,0.2)' }}>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-5" style={{ color: '#4ADE80' }} />
          <span className="text-sm font-medium" style={{ color: '#F2F7F1' }}>Breathing done today</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex size-9 items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(74,222,128,0.15)' }}>
          <Wind className="size-4" style={{ color: '#4ADE80' }} />
        </div>
        <span className="text-sm font-semibold" style={{ color: '#F2F7F1' }}>Breathing Exercise</span>
      </div>
      <p className="text-xs mb-3" style={{ color: '#74917B' }}>5-min session</p>
      <Button
        size="sm"
        onClick={() => setDone(true)}
        className="w-full rounded-full text-xs font-semibold"
        style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: 'none' }}
      >
        Start
      </Button>
    </div>
  )
}

export function ProgramLesson() {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex size-9 items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(240,180,41,0.15)' }}>
          <BookOpen className="size-4" style={{ color: '#F0B429' }} />
        </div>
        <span className="text-sm font-semibold" style={{ color: '#F2F7F1' }}>Today&apos;s Lesson</span>
      </div>
      <p className="text-sm font-medium mb-1" style={{ color: '#F2F7F1' }}>Anxiety &amp; The Cannabis Connection</p>
      <div className="inline-flex rounded-full px-2 py-0.5 text-[10px] mb-3" style={{ backgroundColor: '#142219', color: '#74917B' }}>
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
