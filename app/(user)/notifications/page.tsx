"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trophy, Droplets, Users, BookOpen, CheckCheck, ArrowRight } from "lucide-react"

interface Notification {
  id: number
  type: "milestone" | "reminder" | "community" | "program"
  title: string
  body: string
  time: string
  read: boolean
  route: string
}

const initialNotifications: Notification[] = [
  { id: 1, type: "milestone", title: "Day 14 Complete!", body: "You've hit two weeks clean. Your endocannabinoid system is beginning to recalibrate.", time: "2 hours ago", read: false, route: "/profile" },
  { id: 2, type: "reminder", title: "Hydration Check", body: "You've logged 2 of 8 glasses today. Keep going — hydration reduces cravings.", time: "4 hours ago", read: false, route: "/tools" },
  { id: 3, type: "community", title: "New post in Community", body: "User #C22 shared a 30-day milestone. Leave them a co-sign.", time: "6 hours ago", read: true, route: "/community" },
  { id: 4, type: "program", title: "Next activity unlocked", body: "Week 2: Brain Reset — \"Understanding Sleep Disruption\" is now available.", time: "1 day ago", read: true, route: "/program" },
]

const groupLabels = [
  { ids: [1, 2], label: "Today" },
  { ids: [3], label: "Yesterday" },
  { ids: [4], label: "Earlier This Week" },
]

function NotificationCard({ n, onMarkRead }: { n: Notification; onMarkRead: () => void }) {
  const router = useRouter()
  const styles: Record<string, { bg: string; border: string; iconBg: string; iconColor: string; linkLabel: string; linkRoute: string }> = {
    milestone: {
      bg: 'linear-gradient(135deg, rgba(240,180,41,0.10) 0%, rgba(240,180,41,0.04) 100%)',
      border: '1px solid rgba(240,180,41,0.25)',
      iconBg: 'linear-gradient(135deg, #92660A 0%, #F0B429 100%)',
      iconColor: '#F2F7F1',
      linkLabel: "",
      linkRoute: "",
    },
    reminder: {
      bg: 'linear-gradient(135deg, rgba(94,174,234,0.10) 0%, rgba(94,174,234,0.04) 100%)',
      border: '1px solid rgba(94,174,234,0.25)',
      iconBg: 'rgba(94,174,234,0.18)',
      iconColor: '#5EAEEA',
      linkLabel: "",
      linkRoute: "",
    },
    community: {
      bg: 'linear-gradient(135deg, rgba(74,222,128,0.10) 0%, rgba(74,222,128,0.04) 100%)',
      border: '1px solid rgba(74,222,128,0.25)',
      iconBg: 'rgba(74,222,128,0.18)',
      iconColor: '#4ADE80',
      linkLabel: "View Post",
      linkRoute: "/community",
    },
    program: {
      bg: 'linear-gradient(135deg, rgba(94,174,234,0.08) 0%, rgba(94,174,234,0.03) 100%)',
      border: '1px solid rgba(94,174,234,0.20)',
      iconBg: 'rgba(94,174,234,0.18)',
      iconColor: '#5EAEEA',
      linkLabel: "Start Lesson →",
      linkRoute: "/program",
    },
  }
  const s = styles[n.type]

  const iconMap: Record<string, typeof Trophy> = { milestone: Trophy, reminder: Droplets, community: Users, program: BookOpen }
  const Icon = iconMap[n.type]

  return (
    <div
      className="rounded-2xl p-5 flex gap-4 relative transition-all duration-150 cursor-pointer hover:-translate-y-0.5"
      style={{ background: s.bg, border: s.border }}
      onClick={() => { if (n.read === false) onMarkRead(); router.push(n.route) }}
    >
      <div className="size-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.iconBg }}>
        <Icon className="size-5" style={{ color: s.iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold" style={{ color: '#F2F7F1' }}>{n.title}</p>
        <p className="text-sm mt-0.5 leading-relaxed" style={{ color: '#B9D0BE' }}>{n.body}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs" style={{ color: '#74917B' }}>{n.time}</span>
          {s.linkLabel && (
            <span className="text-xs font-semibold flex items-center gap-1" style={{ color: s.iconColor }}>
              {s.linkLabel} <ArrowRight className="size-3" />
            </span>
          )}
        </div>
      </div>
      {!n.read && (
        <span className="absolute top-4 right-4 size-2 rounded-full" style={{ backgroundColor: s.iconColor }} />
      )}
    </div>
  )
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getGroup = (id: number) => groupLabels.find((g) => g.ids.includes(id))

  return (
    <div id="main-content" className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display" style={{ color: '#F2F7F1' }}>Notifications</h1>
          <p className="mt-1 text-sm" style={{ color: '#74917B' }}>Stay on track with your recovery.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
            style={{ backgroundColor: 'rgba(74,222,128,0.12)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)' }}
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CheckCheck className="size-12 mb-3" style={{ color: 'rgba(116,145,123,0.4)' }} />
          <p className="text-sm font-medium" style={{ color: '#F2F7F1' }}>You&apos;re all caught up</p>
          <p className="text-xs mt-1" style={{ color: '#74917B' }}>New updates about your recovery journey will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {groupLabels.map((group) => {
            const groupNotifications = notifications.filter((n) => group.ids.includes(n.id))
            if (groupNotifications.length === 0) return null
            return (
              <div key={group.label}>
                <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3 mt-6 first:mt-0" style={{ color: '#74917B' }}>{group.label}</p>
                {groupNotifications.map((n) => (
                  <div key={n.id} className="mb-3 last:mb-0">
                    <NotificationCard n={n} onMarkRead={() => markRead(n.id)} />
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
