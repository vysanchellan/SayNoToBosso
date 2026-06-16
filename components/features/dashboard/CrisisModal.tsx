"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { HeartPulse, Phone, MessageCircle, Wind, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

declare global {
  interface Window {
    __openCrisisModal?: () => void
  }
}

export default function CrisisModal() {
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
      <DialogTrigger
        render={<button className="hidden" aria-label="Open crisis support" />}
      />
      <DialogContent className="sm:max-w-sm gap-0 p-0 overflow-hidden rounded-2xl border-destructive/30">
        <div className="relative p-6">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 size-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>

          <div className="flex items-center gap-3 mb-1">
            <HeartPulse className="size-5 text-destructive" />
            <DialogTitle className="text-base font-bold text-foreground">I Need Support Right Now</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            You are not alone. What you&apos;re feeling will pass. Choose an option below.
          </DialogDescription>
        </div>

        <div className="px-6 pb-6 space-y-3">
          <a
            href="tel:0800456789"
            className="flex w-full items-center gap-3 rounded-xl bg-destructive text-destructive-foreground p-4 hover:bg-destructive/90 transition-colors"
          >
            <div className="size-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Phone className="size-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Call SADAG Crisis Line</p>
              <p className="text-xs opacity-80">0800 456 789 &mdash; Free, 24/7</p>
            </div>
          </a>

          <button className="flex w-full items-center gap-3 rounded-xl bg-primary text-primary-foreground p-4 hover:bg-primary/90 transition-colors text-left">
            <div className="size-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Wind className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Start Emergency Breathing Exercise</p>
              <p className="text-xs opacity-80">Calm your nervous system in 2 minutes</p>
            </div>
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl bg-muted border border-border text-foreground p-4 hover:bg-muted/60 transition-colors text-left">
            <div className="size-9 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
              <MessageCircle className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Message My Care Team</p>
              <p className="text-xs text-muted-foreground">They&apos;ll respond as soon as possible</p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
