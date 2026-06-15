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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
          <div
            className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl bg-card border-border"
            style={{
              boxShadow: '0 24px 80px rgba(13,61,36,0.18)',
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Demo preview"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close demo preview"
            >
              <X className="size-5" />
            </button>

            <div className="mb-1 flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-full" style={{ background: 'hsl(var(--accent) / 0.15)' }}>
                <Play className="size-5" style={{ color: 'hsl(var(--accent))' }} />
              </div>
              <h2 className="text-lg font-display font-bold text-foreground">Preview Demo</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Explore CannaClear without creating an account. All data is simulated.
            </p>

            <div className="space-y-3 mt-5">
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full rounded-full justify-start gap-3 h-auto py-3 px-4"
                style={{
                  background: 'linear-gradient(135deg, hsl(155,55%,16%) 0%, hsl(155,48%,22%) 100%)',
                  color: 'hsl(0,0%,98%)',
                }}
              >
                <span className="flex size-8 items-center justify-center rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.15)' }}>U</span>
                <div className="text-left">
                  <p className="text-sm font-semibold">Preview as User</p>
                  <p className="text-xs opacity-80">{DEMO_USER.firstName} &middot; Week {DEMO_USER.currentWeek}</p>
                </div>
              </Button>

              <Button
                onClick={() => router.push("/admin")}
                className="w-full rounded-full justify-start gap-3 h-auto py-3 px-4"
                style={{
                  background: 'linear-gradient(135deg, hsl(160,45%,8%) 0%, hsl(160,38%,13%) 100%)',
                  color: 'hsl(0,0%,98%)',
                }}
              >
                <span className="flex size-8 items-center justify-center rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.15)' }}>A</span>
                <div className="text-left">
                  <p className="text-sm font-semibold">Preview as Admin</p>
                  <p className="text-xs opacity-80">{DEMO_ADMIN.name} &middot; {DEMO_ADMIN.role}</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
