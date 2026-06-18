"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play, X, Sparkles } from "lucide-react"
import { DEMO_USER, DEMO_ADMIN } from "@/lib/demo"

export default function DemoShortcuts() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-amber-950 shadow-2xl transition-all duration-200 hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, hsl(38,85%,48%) 0%, hsl(38,90%,55%) 100%)',
          boxShadow: '0 4px 24px rgba(217,146,10,0.35)',
        }}
        aria-label="Open demo preview menu"
      >
        <Sparkles className="size-4" />
        Try Demo
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.70)' }}>
          <div
            className="relative w-full max-w-md rounded-2xl p-6"
            style={{
              backgroundColor: '#0E1A12',
              border: '1px solid #2A4534',
              boxShadow: '0 24px 64px rgba(0,0,0,0.65)',
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Demo preview"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: '#74917B' }}
              aria-label="Close demo preview"
            >
              <X className="size-5" />
            </button>

            <div className="mb-1 flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(74,222,128,0.15)' }}>
                <Play className="size-5" style={{ color: '#4ADE80' }} />
              </div>
              <h2 className="text-lg font-semibold" style={{ color: '#F2F7F1' }}>Preview Demo</h2>
            </div>
            <p className="text-sm" style={{ color: '#B9D0BE' }}>
              Explore CannaClear without creating an account. All data is simulated.
            </p>

            <div className="space-y-3 mt-5">
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full rounded-full justify-start gap-3 h-auto py-3 px-4"
                style={{
                  backgroundColor: '#142219',
                  border: '1px solid #2A4534',
                  color: '#F2F7F1',
                }}
              >
                <span className="flex size-8 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: '#1A5C38', color: '#F2F7F1' }}>U</span>
                <div className="text-left">
                  <p className="text-sm font-semibold">Preview as User</p>
                  <p className="text-xs" style={{ color: '#74917B' }}>{DEMO_USER.firstName} &middot; Week {DEMO_USER.currentWeek}</p>
                </div>
              </Button>

              <Button
                onClick={() => router.push("/admin")}
                className="w-full rounded-full justify-start gap-3 h-auto py-3 px-4"
                style={{
                  backgroundColor: '#142219',
                  border: '1px solid #2A4534',
                  color: '#F2F7F1',
                }}
              >
                <span className="flex size-8 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: '#1A5C38', color: '#F2F7F1' }}>A</span>
                <div className="text-left">
                  <p className="text-sm font-semibold">Preview as Admin</p>
                  <p className="text-xs" style={{ color: '#74917B' }}>{DEMO_ADMIN.name} &middot; {DEMO_ADMIN.role}</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
