"use client"

import { useState } from "react"
import { Trophy, Droplets, Users, BookOpen, CheckCheck } from "lucide-react"

interface Notification {
  id: number
  type: "milestone" | "reminder" | "community" | "program"
  title: string
  body: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, type: "milestone", title: "Day 14 Complete!", body: "You've hit two weeks clean. Your endocannabinoid system is beginning to recalibrate.", time: "2 hours ago", read: false },
  { id: 2, type: "reminder", title: "Hydration Check", body: "You've logged 2 of 8 glasses today. Keep going — hydration reduces cravings.", time: "4 hours ago", read: false },
  { id: 3, type: "community", title: "New post in Community", body: "User #C22 shared a 30-day milestone. Leave them a co-sign.", time: "6 hours ago", read: true },
  { id: 4, type: "program", title: "Next activity unlocked", body: "Week 2: Brain Reset — \"Understanding Sleep Disruption\" is now available.", time: "1 day ago", read: true },
]

const iconConfig: Record<string, { icon: typeof Trophy; className: string; bg: string }> = {
  milestone: { icon: Trophy, className: "text-amber-400", bg: "bg-amber-500/10" },
  reminder: { icon: Droplets, className: "text-blue-400", bg: "bg-blue-500/10" },
  community: { icon: Users, className: "text-primary", bg: "bg-primary/10" },
  program: { icon: BookOpen, className: "text-sage", bg: "bg-muted" },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div id="main-content" className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Notifications</h1>
          <p className="mt-1 text-muted-foreground text-sm">Stay on track with your recovery.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-primary hover:underline underline-offset-2"
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CheckCheck className="size-12 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-foreground">You&apos;re all caught up</p>
          <p className="text-xs text-muted-foreground mt-1">Check back later for updates.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const icon = iconConfig[n.type] || iconConfig.program
            const Icon = icon.icon
            return (
              <div
                key={n.id}
                className={`relative rounded-xl border p-4 flex gap-3 transition-colors ${
                  !n.read
                    ? "border-l-4 border-l-primary bg-primary/10 border-border"
                    : "bg-card border-border"
                }`}
              >
                <div className={`size-9 rounded-full ${icon.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`size-4 ${icon.className}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
                {!n.read && (
                  <span className="absolute top-3 right-3 size-1.5 rounded-full bg-primary" />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
