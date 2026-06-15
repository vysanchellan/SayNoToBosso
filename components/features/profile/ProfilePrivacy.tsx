"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ProfilePrivacy() {
  const [prefs, setPrefs] = useState({
    careTeam: true,
    anonymised: true,
    community: true,
  })
  const [deleting, setDeleting] = useState(false)

  return (
    <div className="space-y-6 max-w-xl">
      <div className="rounded-2xl border bg-card p-4 space-y-4">
        <h3 className="text-sm font-semibold">Who can see your data?</h3>
        {[
          { key: "careTeam", label: "Share progress data with care team", desc: "Your care team can view your check-ins, program progress, and journal entries." },
          { key: "anonymised", label: "Include anonymised data in facility reports", desc: "Your data helps improve recovery outcomes across your facility." },
          { key: "community", label: "Allow community posts", desc: "You can post and interact with the recovery community." },
        ].map((item) => (
          <div key={item.key} className="flex items-start gap-3 py-2">
            <input
              type="checkbox"
              checked={prefs[item.key as keyof typeof prefs]}
              onChange={(e) => setPrefs((p) => ({ ...p, [item.key]: e.target.checked }))}
              className="mt-0.5 rounded border-muted-foreground/30 text-primary focus:ring-primary/30"
            />
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-card p-4 space-y-4">
        <h3 className="text-sm font-semibold">Your POPIA Rights</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Right to Access</p>
              <p className="text-xs text-muted-foreground">Download a copy of your data</p>
            </div>
            <Button
              onClick={() => alert("A download link would be sent to your registered email.")}
              variant="outline"
              className="rounded-full text-xs"
            >
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Right to Correction</p>
              <p className="text-xs text-muted-foreground">Update or correct your information</p>
            </div>
            <p className="text-xs text-muted-foreground">Edit above</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Right to Deletion</p>
              <p className="text-xs text-muted-foreground">Request account deletion</p>
            </div>
            <Dialog open={deleting} onOpenChange={setDeleting}>
              <DialogTrigger render={
                <Button variant="outline" className="rounded-full text-xs text-destructive border-destructive/30">
                  Request Deletion
                </Button>
              } />
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Delete Your Account?</DialogTitle>
                  <DialogDescription>
                    This will permanently delete all your data from CannaClear. Your care team will be notified. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 justify-end pt-2">
                  <Button
                    onClick={() => setDeleting(false)}
                    variant="outline"
                    className="rounded-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => { setDeleting(false); alert("Deletion request submitted.") }}
                    className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete My Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground/60">
        Data retention: Your data is stored securely for the duration of your program and up to 12 months thereafter, in compliance with POPIA. You may request earlier deletion at any time.
      </p>
      <p className="text-[10px] text-muted-foreground/60">
        <a href="#" className="underline hover:text-primary">CannaClear Privacy Policy</a>
      </p>
    </div>
  )
}
