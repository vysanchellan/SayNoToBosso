"use client"

import { Wind, Moon, Apple, PenLine, BookOpen, HeartPulse } from "lucide-react"
import Link from "next/link"

const tools = [
  { icon: Wind, label: "Breathing", href: "/tools#breathing", bg: "rgba(74,222,128,0.15)", color: "#4ADE80" },
  { icon: Moon, label: "Sleep Log", href: "/tools#sleep", bg: "rgba(94,174,234,0.15)", color: "#5EAEEA" },
  { icon: Apple, label: "Nutrition", href: "/tools#nutrition", bg: "rgba(240,180,41,0.15)", color: "#F0B429" },
  { icon: PenLine, label: "Journal", href: "/journal", bg: "rgba(74,222,128,0.15)", color: "#4ADE80" },
  { icon: BookOpen, label: "Research", href: "/research", bg: "rgba(94,174,234,0.15)", color: "#5EAEEA" },
  { icon: HeartPulse, label: "Crisis Help", href: "#crisis", bg: "rgba(248,113,113,0.15)", color: "#F87171" },
]

export default function QuickTools() {
  const handleCrisis = () => {
    window.__openCrisisModal?.()
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {tools.map((tool) =>
        tool.label === "Crisis Help" ? (
          <button
            key={tool.label}
            onClick={handleCrisis}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}
          >
            <div
              className="flex size-12 items-center justify-center rounded-full"
              style={{ backgroundColor: tool.bg }}
            >
              <tool.icon className="size-6" style={{ color: tool.color }} />
            </div>
            <span className="text-xs font-semibold text-center" style={{ color: '#B9D0BE' }}>{tool.label}</span>
          </button>
        ) : (
          <Link
            key={tool.label}
            href={tool.href}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}
          >
            <div
              className="flex size-12 items-center justify-center rounded-full"
              style={{ backgroundColor: tool.bg }}
            >
              <tool.icon className="size-6" style={{ color: tool.color }} />
            </div>
            <span className="text-xs font-semibold text-center" style={{ color: '#B9D0BE' }}>{tool.label}</span>
          </Link>
        )
      )}
    </div>
  )
}
