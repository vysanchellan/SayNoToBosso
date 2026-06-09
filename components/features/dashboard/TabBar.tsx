"use client"

import { motion } from "framer-motion"

const tabs = ["Today", "This Week", "All Time"] as const

export default function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  return (
    <div className="inline-flex rounded-full bg-muted p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === tab ? "text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {active === tab && (
            <motion.div
              layoutId="tab-pill"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  )
}
