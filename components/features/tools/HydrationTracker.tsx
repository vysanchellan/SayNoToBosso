"use client"

import { useState } from "react"
import { Plus, Minus, Droplets, Flame } from "lucide-react"

export default function HydrationTracker() {
  const [glasses, setGlasses] = useState(4)
  const goal = 8
  const percent = Math.min((glasses / goal) * 100, 100)
  const [showInfo, setShowInfo] = useState(false)

  const waterFill = percent < 30 ? "#93c5fd" : percent < 60 ? "#3b82f6" : "#1d4ed8"

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="relative mb-6" style={{ width: 80, height: 200 }}>
            <svg width="80" height="200" viewBox="0 0 80 200" className="drop-shadow-md">
              <defs>
                <clipPath id="bottle-clip">
                  <rect x="15" y="10" width="50" height="170" rx="8" />
                </clipPath>
                <linearGradient id="water-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={waterFill} />
                  <stop offset="100%" stopColor={`${waterFill}99`} />
                </linearGradient>
              </defs>
              <rect x="15" y="10" width="50" height="170" rx="8" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.3" />
              <rect clipPath="url(#bottle-clip)" x="15" y={180 - percent * 1.7} width="50" height={percent * 1.7} fill="url(#water-grad)" rx="0" style={{ transition: "y 0.5s ease, height 0.5s ease" }} />
              {percent > 10 && (
                <ellipse cx="40" cy={180 - percent * 1.7 + 4} rx="20" ry="3" fill="white" opacity="0.3">
                  <animate attributeName="rx" values="20;22;20" dur="2s" repeatCount="indefinite" />
                </ellipse>
              )}
              <rect x="28" y="2" width="24" height="10" rx="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.3" />
            </svg>
          </div>

          <p className="text-lg font-semibold text-foreground mb-4">
            {glasses} of {goal} glasses today
          </p>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setGlasses(Math.max(0, glasses - 1))}
              className="flex size-14 items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary/10 transition-all active:scale-95"
              aria-label="Remove glass"
            >
              <Minus className="size-6" />
            </button>
            <button
              onClick={() => setGlasses(Math.min(goal, glasses + 1))}
              className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-all active:scale-95"
              aria-label="Add glass"
            >
              <Plus className="size-6" />
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

      <div className="rounded-2xl border bg-white shadow-sm">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <span className="text-sm font-semibold text-foreground">Why Hydration Matters</span>
          <span className="text-muted-foreground text-sm">{showInfo ? "−" : "+"}</span>
        </button>
        {showInfo && (
          <div className="border-t px-4 py-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cannabis use can cause dehydration and electrolyte imbalance. During recovery, water supports liver detox, reduces headaches, improves mood stability, and aids sleep.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
