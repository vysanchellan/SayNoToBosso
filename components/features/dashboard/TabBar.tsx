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
            className="flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm transition-colors duration-150"
            style={
              isActive
                ? { backgroundColor: 'rgba(255,255,255,0.06)', color: '#F2F7F1', fontWeight: 600 }
                : { color: '#74917B' }
            }
          >
            <tab.icon className="size-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
