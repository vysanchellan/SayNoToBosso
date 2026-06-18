"use client"

import { useState } from "react"
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts"
import { Camera, Flame, BookOpen, PenLine, Trophy, TrendingUp, Award, CheckCircle2 } from "lucide-react"

const moods = [
  { day: "D1", mood: 3 }, { day: "D2", mood: 4 }, { day: "D3", mood: 2 }, { day: "D4", mood: 3 },
  { day: "D5", mood: 4 }, { day: "D6", mood: 5 }, { day: "D7", mood: 4 }, { day: "D8", mood: 5 },
  { day: "D9", mood: 6 }, { day: "D10", mood: 5 }, { day: "D11", mood: 6 }, { day: "D12", mood: 7 },
  { day: "D13", mood: 6 }, { day: "D14", mood: 7 },
]

const avatars = [
  { id: "a1", color: "bg-green-700", icon: "🌿" },
  { id: "a2", color: "bg-emerald-600", icon: "🍃" },
  { id: "a3", color: "bg-teal-600", icon: "🌱" },
  { id: "a4", color: "bg-sage-600", icon: "🌻" },
  { id: "a5", color: "bg-amber-700", icon: "🌙" },
  { id: "a6", color: "bg-sky-700", icon: "⭐" },
  { id: "a7", color: "bg-violet-700", icon: "🦋" },
  { id: "a8", color: "bg-rose-700", icon: "🌸" },
]

const recentMilestones = [
  { label: "First Week Complete", date: "May 2026", icon: Trophy },
  { label: "5-Day Streak", date: "May 2026", icon: Flame },
  { label: "First Journal Entry", date: "May 2026", icon: PenLine },
]

export default function ProfileOverview() {
  const [selectedAvatar, setSelectedAvatar] = useState("a1")

  const weekStats: { icon: React.ReactNode; value: string; label: string }[] = [
    { icon: <CheckCircle2 className="inline-block size-5 align-text-bottom" />, value: "6/7", label: "Check-ins" },
    { icon: "💤", value: "7.4h", label: "Avg Sleep" },
    { icon: "💧", value: "5/7", label: "Hydration" },
    { icon: "🌬️", value: "4", label: "Breathing" },
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="rounded-2xl p-6 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #103D24 0%, #1A5C38 50%, #0C2D1A 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <svg className="absolute bottom-0 right-0 size-40 opacity-[0.04] pointer-events-none" viewBox="0 0 200 200" fill="white" aria-hidden="true">
          <path d="M100 20C130 20 160 50 170 90C180 130 160 170 130 185C100 200 60 190 35 160C10 130 10 90 30 60C50 30 70 20 100 20Z" />
          <path d="M100 60C115 60 130 75 135 95C140 115 130 135 115 145C100 155 80 150 65 135C50 120 50 100 60 85C70 70 85 60 100 60Z" />
        </svg>
        <div className="relative flex flex-col sm:flex-row items-center gap-5">
          <div className="relative">
            <div className="size-[72px] rounded-full flex items-center justify-center text-2xl font-bold" style={{ border: '3px solid #F0B429', boxShadow: '0 0 20px rgba(240,180,41,0.30)' }}>
              <span>{avatars.find((a) => a.id === selectedAvatar)?.icon || "JM"}</span>
            </div>
            <button
              onClick={() => {
                const ids = avatars.map((a) => a.id)
                const idx = ids.indexOf(selectedAvatar)
                setSelectedAvatar(ids[(idx + 1) % ids.length])
              }}
              className="absolute -bottom-1 -right-1 size-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#0E1A12', border: '2px solid #1A5C38' }}
              aria-label="Change avatar"
            >
              <Camera className="size-3.5" style={{ color: '#74917B' }} />
            </button>
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
              <h2 className="text-2xl font-bold font-display" style={{ color: '#F2F7F1' }}>Jordan M.</h2>
              <span className="rounded-full px-3 py-1 text-xs font-semibold inline-flex items-center gap-1"
                style={{ backgroundColor: 'rgba(240,180,41,0.20)', color: '#F0B429', border: '1px solid rgba(240,180,41,0.35)' }}>
                <Award className="size-3" /> Moderate
              </span>
            </div>
            <p className="mt-1" style={{ color: 'rgba(242,247,241,0.75)' }}>Day 14 of Recovery &middot; Moderate Use Program</p>
            <p className="text-sm" style={{ color: 'rgba(242,247,241,0.55)' }}>Member since May 2026</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: 'rgba(240,180,41,0.06)', border: '1px solid rgba(240,180,41,0.18)' }}>
          <Flame className="size-5 mx-auto mb-1" style={{ color: '#F0B429' }} />
          <p className="text-3xl font-bold font-display tabular-nums" style={{ color: '#F2F7F1' }}>14</p>
          <p className="text-xs font-semibold tracking-wide uppercase mt-1" style={{ color: '#74917B' }}>Days in Program</p>
        </div>
        <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: 'rgba(94,174,234,0.06)', border: '1px solid rgba(94,174,234,0.18)' }}>
          <BookOpen className="size-5 mx-auto mb-1" style={{ color: '#5EAEEA' }} />
          <p className="text-3xl font-bold font-display tabular-nums" style={{ color: '#F2F7F1' }}>3</p>
          <p className="text-xs font-semibold tracking-wide uppercase mt-1" style={{ color: '#74917B' }}>Lessons Complete</p>
        </div>
        <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.18)' }}>
          <PenLine className="size-5 mx-auto mb-1" style={{ color: '#4ADE80' }} />
          <p className="text-3xl font-bold font-display tabular-nums" style={{ color: '#F2F7F1' }}>7</p>
          <p className="text-xs font-semibold tracking-wide uppercase mt-1" style={{ color: '#74917B' }}>Journal Entries</p>
        </div>
        <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: 'rgba(240,180,41,0.06)', border: '1px solid rgba(240,180,41,0.18)' }}>
          <Trophy className="size-5 mx-auto mb-1" style={{ color: '#F0B429' }} />
          <p className="text-3xl font-bold font-display tabular-nums" style={{ color: '#F2F7F1' }}>4</p>
          <p className="text-xs font-semibold tracking-wide uppercase mt-1" style={{ color: '#74917B' }}>Badges Earned</p>
        </div>
      </div>

      {/* Mood Trend Chart */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
        <div className="rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2" style={{ backgroundColor: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.20)' }}>
          <TrendingUp className="size-4" style={{ color: '#4ADE80' }} />
          <p className="text-sm font-medium" style={{ color: '#4ADE80' }}>Your mood has been trending upward this week 📈</p>
        </div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#F2F7F1' }}>Mood Trend (Last 14 Days)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={moods}>
              <defs>
                <linearGradient id="moodGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A5C38" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1A5C38" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#74917B" }} axisLine={false} tickLine={false} />
              <YAxis domain={[1, 10]} ticks={[1, 3, 5, 7, 10]} tick={{ fontSize: 10, fill: "#74917B" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="mood" stroke="#4ADE80" fill="url(#moodGrad2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-3 mt-4 flex-wrap">
          <span className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: '#142219', border: '1px solid #1F3326', color: '#B9D0BE' }}>This Week Avg: 7.2</span>
          <span className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: '#142219', border: '1px solid #1F3326', color: '#B9D0BE' }}>Last Week Avg: 6.4</span>
          <span className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: '#142219', border: '1px solid #1F3326', color: '#B9D0BE' }}>Best Day: Day 11 (9/10)</span>
        </div>
      </div>

      {/* Recent Milestones */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold" style={{ color: '#F2F7F1' }}>Recent Milestones</h3>
          <button className="text-xs font-semibold" style={{ color: '#4ADE80' }}>View All →</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recentMilestones.map((m, i) => (
            <div key={i} className="rounded-xl p-4 shrink-0 flex items-center gap-3 min-w-[200px]" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
              <div className="size-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(240,180,41,0.15)' }}>
                <m.icon className="size-5" style={{ color: '#F0B429' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#F2F7F1' }}>{m.label}</p>
                <p className="text-xs" style={{ color: '#74917B' }}>{m.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* This Week at a Glance */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#F2F7F1' }}>This Week at a Glance</h3>
        <div className="flex items-center justify-around">
          {weekStats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{stat.icon}</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#F2F7F1' }}>{stat.value}</p>
                  <p className="text-[10px]" style={{ color: '#74917B' }}>{stat.label}</p>
                </div>
              </div>
              {i < weekStats.length - 1 && <div className="h-8 w-px" style={{ backgroundColor: '#1F3326' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
