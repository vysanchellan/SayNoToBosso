"use client"

import { useState } from "react"
import ProfileOverview from "@/components/features/profile/ProfileOverview"
import ProfileSettings from "@/components/features/profile/ProfileSettings"
import ProfilePrivacy from "@/components/features/profile/ProfilePrivacy"
import AchievementsGrid from "@/components/features/milestones/AchievementsGrid"

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "achievements", label: "Achievements" },
  { key: "settings", label: "Settings" },
  { key: "privacy", label: "Privacy" },
]

export default function ProfilePage() {
  const [tab, setTab] = useState("overview")

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Profile</h1>

      <div className="flex gap-1 rounded-2xl border bg-white p-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && <ProfileOverview />}
      {tab === "achievements" && <AchievementsGrid />}
      {tab === "settings" && <ProfileSettings />}
      {tab === "privacy" && <ProfilePrivacy />}
    </div>
  )
}
