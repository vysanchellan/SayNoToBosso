"use client"

import { Wind, Moon, Droplets, Apple, Dumbbell, Sparkles } from "lucide-react"

const tabs = [
  { label: "Breathing", icon: Wind },
  { label: "Sleep", icon: Moon },
  { label: "Hydration", icon: Droplets },
  { label: "Nutrition", icon: Apple },
  { label: "Movement", icon: Dumbbell },
  { label: "Mindfulness", icon: Sparkles },
]

export default function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-2xl p-1"
      style={{ background: 'hsl(var(--sage-light))', border: '1px solid hsl(var(--border))' }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.label
        return (
          <button
            key={tab.label}
            onClick={() => onChange(tab.label)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150 ${
              isActive
                ? "text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={isActive ? { background: 'hsl(var(--primary))' } : {}}
          >
            <tab.icon className="size-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
