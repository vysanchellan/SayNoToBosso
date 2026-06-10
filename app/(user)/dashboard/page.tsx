"use client"

import { useState } from "react"
import StreakCounter from "@/components/features/dashboard/StreakCounter"
import DailyCheckin from "@/components/features/dashboard/DailyCheckin"
import { HydrationGoal, BreathingGoal, ProgramLesson } from "@/components/features/dashboard/TodaysGoals"
import ProgressRings from "@/components/features/dashboard/ProgressRings"
import WeeklyProgramCard from "@/components/features/dashboard/WeeklyProgramCard"
import MilestonesPreview from "@/components/features/dashboard/MilestonesPreview"
import NotificationBanner from "@/components/features/dashboard/NotificationBanner"
import TabBar from "@/components/features/dashboard/TabBar"
import QuickTools from "@/components/features/dashboard/QuickTools"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("Today")

  return (
    <div id="main-content" className="space-y-6 max-w-6xl mx-auto">
      <NotificationBanner />

      <div
        className="rounded-2xl p-6 sm:p-8 relative overflow-hidden text-white"
        style={{
          background: 'linear-gradient(135deg, #0D3D24 0%, #1A5C38 60%, #0A2B18 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(13,61,36,0.35)',
        }}
      >
        <div className="absolute top-0 right-0 size-40 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,146,10,0.20) 0%, transparent 70%)' }} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl font-display">
              Good morning, Thabo.
            </h2>
            <p className="mt-1 text-white/70">Day 14 of your recovery. You&apos;ve come a long way.</p>
          </div>
          <StreakCounter />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DailyCheckin />
        </div>
        <div className="space-y-4">
          <HydrationGoal />
          <BreathingGoal />
          <ProgramLesson />
        </div>
      </div>

      <ProgressRings />

      <div className="grid gap-6 lg:grid-cols-2">
        <WeeklyProgramCard />
        <MilestonesPreview />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Quick Tools</h3>
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>

      <QuickTools />
    </div>
  )
}
