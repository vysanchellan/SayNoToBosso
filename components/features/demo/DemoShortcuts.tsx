"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"
import { DEMO_USER, DEMO_ADMIN } from "@/lib/demo"

export default function DemoShortcuts() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2.5 text-sm font-semibold text-amber-900 shadow-lg hover:bg-amber-300 transition-all"
        aria-label="Open demo preview menu"
      >
        <Play className="size-4 fill-current" />
        Try Demo
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Demo preview"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Close demo preview"
            >
              <X className="size-5" />
            </button>

            <div className="mb-1 flex items-center gap-2">
              <Play className="size-5 text-amber-500" />
              <h2 className="text-lg font-bold">Preview Demo</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-5">
              Explore CannaClear without creating an account. All data is simulated.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 justify-start gap-3"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">U</span>
                <div className="text-left">
                  <p className="text-sm font-semibold">Preview as User</p>
                  <p className="text-xs opacity-80">{DEMO_USER.firstName} &middot; Week {DEMO_USER.currentWeek}</p>
                </div>
              </Button>

              <Button
                onClick={() => router.push("/admin")}
                className="w-full rounded-full bg-[#1E2A3A] text-white hover:bg-[#2A3A4A] justify-start gap-3"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">A</span>
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
