"use client"

import { useState } from "react"
import { useDemo } from "@/lib/demo-context"
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
  const { user } = useDemo()
  const firstName = user?.firstName || "there"
  const [activeTab, setActiveTab] = useState("Today")

  return (
    <div id="main-content" className="space-y-6 max-w-6xl mx-auto">
      <NotificationBanner />

      <div
        className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #103D24 0%, #1E6B3F 60%, #0C2D1A 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(13,61,36,0.35)',
        }}
      >
        <div className="absolute top-0 right-0 size-40 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(240,180,41,0.15) 0%, transparent 70%)' }} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl font-display" style={{ color: '#F2F7F1' }}>
              Good morning, {firstName}.
            </h2>
            <p className="mt-1" style={{ color: 'rgba(242,247,241,0.65)' }}>Day 14 of your recovery. You&apos;ve come a long way.</p>
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
        <h3 className="text-lg font-semibold" style={{ color: '#F2F7F1' }}>Quick Tools</h3>
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>

      <QuickTools />
    </div>
  )
}
