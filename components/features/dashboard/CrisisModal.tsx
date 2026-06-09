"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { HeartPulse, Phone, MessageCircle, Wind } from "lucide-react"
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-destructive/20">
              <HeartPulse className="size-5 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-destructive text-lg">I Need Support Right Now</DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            You are not alone. What you&apos;re feeling will pass. Choose an option below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <a
            href="tel:0800456789"
            className="flex items-center gap-4 rounded-xl border border-destructive/20 bg-destructive/5 p-4 hover:bg-destructive/10 transition-colors"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/20">
              <Phone className="size-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Call SADAG Crisis Line</p>
              <p className="text-xs text-muted-foreground">0800 456 789 &mdash; Free, 24/7</p>
            </div>
          </a>

          <button className="flex w-full items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 transition-colors text-left">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <Wind className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Start Emergency Breathing Exercise</p>
              <p className="text-xs text-muted-foreground">Calm your nervous system in 2 minutes</p>
            </div>
          </button>

          <button className="flex w-full items-center gap-4 rounded-xl border border-accent/20 bg-accent/5 p-4 hover:bg-accent/10 transition-colors text-left">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/20">
              <MessageCircle className="size-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Message My Care Team</p>
              <p className="text-xs text-muted-foreground">They&apos;ll respond as soon as possible</p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
