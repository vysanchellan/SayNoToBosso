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
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => {
        const isActive = active === tab.label
        return (
          <button
            key={tab.label}
            onClick={() => onChange(tab.label)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm transition-colors duration-150 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            <tab.icon className="size-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
