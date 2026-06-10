"use client"

import { useDemo } from "@/lib/demo-context"
import { AlertTriangle } from "lucide-react"

export default function DemoBanner() {
  const { isDemo } = useDemo()
  if (!isDemo) return null

  return (
    <div
      className="relative z-50 flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-semibold"
      style={{
        background: 'linear-gradient(90deg, hsl(38,85%,48%) 0%, hsl(38,90%,55%) 50%, hsl(38,85%,48%) 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 3s ease-in-out infinite',
        color: 'hsl(38,90%,8%)',
      }}
      role="alert"
    >
      <AlertTriangle className="size-3.5 shrink-0" />
      <span>DEMO MODE — All data is simulated for preview purposes only</span>
    </div>
  )
}
