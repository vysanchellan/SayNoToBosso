"use client"

import { useDemo } from "@/lib/demo-context"
import { AlertTriangle } from "lucide-react"

export default function DemoBanner() {
  const { isDemo } = useDemo()
  if (!isDemo) return null

  return (
    <div className="relative z-50 flex items-center justify-center gap-2 bg-amber-400 px-4 py-1.5 text-xs font-semibold text-amber-900" role="alert">
      <AlertTriangle className="size-3.5 shrink-0" />
      <span>DEMO MODE — All data is simulated for preview purposes only</span>
    </div>
  )
}
