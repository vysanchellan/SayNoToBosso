"use client"

import { useState } from "react"
import { Plus, Minus, Droplets, Flame } from "lucide-react"

export default function HydrationTracker() {
  const [glasses, setGlasses] = useState(4)
  const goal = 8
  const percent = Math.min((glasses / goal) * 100, 100)
  const [showInfo, setShowInfo] = useState(false)

  const waterLevel = "hsl(155 50% 65%)"
  const waterLevelDark = "hsl(155 50% 45%)"

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-card p-6" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4), 0 1px 3px hsl(160 28% 4% / 0.1)' }}>
        <div className="flex flex-col items-center">
          <div className="relative mb-6" style={{ width: 80, height: 200 }}>
            <svg width="80" height="200" viewBox="0 0 80 200" className="drop-shadow-md">
              <defs>
                <clipPath id="bottle-clip">
                  <rect x="15" y="10" width="50" height="170" rx="8" />
                </clipPath>
                <linearGradient id="water-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="hsl(155 50% 65%)" />
                  <stop offset="100%" stopColor="hsl(155 50% 65% / 0.6)" />
                </linearGradient>
                <linearGradient id="water-grad-dark" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="hsl(155 50% 45%)" />
                  <stop offset="100%" stopColor="hsl(155 50% 45% / 0.6)" />
                </linearGradient>
              </defs>
              <rect x="15" y="10" width="50" height="170" rx="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
              <rect clipPath="url(#bottle-clip)" x="15" y={180 - percent * 1.7} width="50" height={percent * 1.7} fill="url(#water-grad)" className="dark:hidden" rx="0" style={{ transition: "y 0.5s ease, height 0.5s ease" }} />
              <rect clipPath="url(#bottle-clip)" x="15" y={180 - percent * 1.7} width="50" height={percent * 1.7} fill="url(#water-grad-dark)" className="hidden dark:block" rx="0" style={{ transition: "y 0.5s ease, height 0.5s ease" }} />
              {percent > 10 && (
                <ellipse cx="40" cy={180 - percent * 1.7 + 4} rx="20" ry="3" fill="white" opacity="0.3">
                  <animate attributeName="rx" values="20;22;20" dur="2s" repeatCount="indefinite" />
                </ellipse>
              )}
              <rect x="28" y="2" width="24" height="10" rx="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
            </svg>
          </div>

          <p className="text-lg font-semibold text-foreground mb-4">
            {glasses} of {goal} glasses today
          </p>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setGlasses(Math.max(0, glasses - 1))}
              className="size-11 rounded-full bg-muted border border-border flex items-center justify-center text-xl font-light hover:bg-muted/60 active:scale-95 transition-all text-foreground"
              aria-label="Remove glass"
            >
              <Minus className="size-5" />
            </button>
            <button
              onClick={() => setGlasses(Math.min(goal, glasses + 1))}
              className="size-11 rounded-full bg-primary text-primary-foreground border border-primary flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all"
              aria-label="Add glass"
            >
              <Plus className="size-5" />
            </button>
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {Array.from({ length: goal }, (_, i) => (
              <button
                key={i}
                onClick={() => setGlasses(i < glasses ? i : i + 1)}
                className={`flex size-10 items-center justify-center rounded-full border-2 transition-all ${
                  i < glasses
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/20 text-muted-foreground/40"
                }`}
                aria-label={`Toggle glass ${i + 1}`}
              >
                <Droplets className="size-4" />
              </button>
            ))}
          </div>
        </div>

        {glasses >= goal && (
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Flame className="size-3" /> Hydration goal hit 5 days in a row
            </span>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-card" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4), 0 1px 3px hsl(160 28% 4% / 0.1)' }}>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <span className="text-sm font-semibold text-foreground">Why Hydration Matters</span>
          <span className="text-muted-foreground text-sm">{showInfo ? "−" : "+"}</span>
        </button>
        {showInfo && (
          <div className="border-t border-border px-4 py-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cannabis use can cause dehydration and electrolyte imbalance. During recovery, water supports liver detox, reduces headaches, improves mood stability, and aids sleep.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
