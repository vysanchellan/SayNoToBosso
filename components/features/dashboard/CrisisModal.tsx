"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { HeartPulse, Phone, MessageCircle, Wind, X } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

declare global {
  interface Window {
    __openCrisisModal?: () => void
  }
}

export default function CrisisModal() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.__openCrisisModal = () => {
      setOpen(true)
      toast.info("Support resources are available below", { duration: Infinity })
    }
    return () => { delete window.__openCrisisModal }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm gap-0 p-0 overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(248,113,113,0.3)', backgroundColor: '#0E1A12' }}>
        <div className="relative p-6">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 size-7 rounded-lg flex items-center justify-center"
            style={{ color: '#74917B' }}
            aria-label="Close"
          >
            <X className="size-4" />
          </button>

          <div className="flex items-center gap-3 mb-1">
            <HeartPulse className="size-5" style={{ color: '#F87171' }} />
            <DialogTitle className="text-base font-bold" style={{ color: '#F2F7F1' }}>I Need Support Right Now</DialogTitle>
          </div>
          <DialogDescription className="text-sm mt-1" style={{ color: '#74917B' }}>
            You are not alone. What you&apos;re feeling will pass. Choose an option below.
          </DialogDescription>
        </div>

        <div className="px-6 pb-6 space-y-3">
          <a
            href="tel:0800456789"
            className="flex w-full items-center gap-3 rounded-xl p-4 transition-colors"
            style={{ backgroundColor: '#F87171', color: '#F2F7F1' }}
          >
            <div className="size-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Phone className="size-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Call SADAG Crisis Line</p>
              <p className="text-xs opacity-80">0800 456 789 &mdash; Free, 24/7</p>
            </div>
          </a>

          <button
            onClick={() => { setOpen(false); router.push("/tools#breathing") }}
            className="flex w-full items-center gap-3 rounded-xl p-4 transition-colors text-left"
            style={{ backgroundColor: '#4ADE80', color: '#07100B' }}
          >
            <div className="size-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Wind className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Start Emergency Breathing Exercise</p>
              <p className="text-xs opacity-80">Calm your nervous system in 2 minutes</p>
            </div>
          </button>

          <button
            onClick={() => { setOpen(false); router.push("/community") }}
            className="flex w-full items-center gap-3 rounded-xl p-4 transition-colors text-left"
            style={{ backgroundColor: '#142219', color: '#F2F7F1', border: '1px solid #1F3326' }}
          >
            <div className="size-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
              <MessageCircle className="size-5" style={{ color: '#74917B' }} />
            </div>
            <div>
              <p className="text-sm font-bold">Message My Care Team</p>
              <p className="text-xs" style={{ color: '#74917B' }}>They&apos;ll respond as soon as possible</p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
