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
    <div className="space-y-6 max-w-6xl mx-auto">
      <NotificationBanner />

      <div className="rounded-2xl bg-gradient-to-br from-secondary/10 to-white border p-6 sm:p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cpath d='M150 30C200 30 250 70 270 130C290 190 270 250 220 280C170 310 100 300 60 260C20 220 10 160 30 110C50 60 100 30 150 30Z' fill='%231A5C3A' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Good morning, Thabo. 🌿
            </h2>
            <p className="mt-1 text-muted-foreground">Day 14 of your recovery. You&apos;ve come a long way.</p>
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
