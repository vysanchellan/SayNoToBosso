"use client"

import { useState } from "react"
import TabBar from "@/components/features/dashboard/TabBar"
import BreathingTool from "@/components/features/tools/BreathingTool"
import SleepTracker from "@/components/features/tools/SleepTracker"
import HydrationTracker from "@/components/features/tools/HydrationTracker"
import NutritionGuide from "@/components/features/tools/NutritionGuide"
import MovementLog from "@/components/features/tools/MovementLog"
import MindfulnessCentre from "@/components/features/tools/MindfulnessCentre"

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("Breathing")

  return (
    <div id="main-content" className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Daily Tools</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Evidence-based tools to support your recovery journey.
        </p>
      </div>

      <div className="flex justify-center">
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>

      <div key={activeTab}>
        {activeTab === "Breathing" && <BreathingTool />}
        {activeTab === "Sleep" && <SleepTracker />}
        {activeTab === "Hydration" && <HydrationTracker />}
        {activeTab === "Nutrition" && <NutritionGuide />}
        {activeTab === "Movement" && <MovementLog />}
        {activeTab === "Mindfulness" && <MindfulnessCentre />}
      </div>
    </div>
  )
}
