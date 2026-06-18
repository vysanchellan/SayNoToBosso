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
    <div id="main-content" className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: '#F2F7F1' }}>Your Profile</h1>

      <div className="flex border-b gap-0" style={{ borderColor: '#1F3326' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2`}
            style={{ color: tab === t.key ? '#4ADE80' : '#74917B', borderBottomColor: tab === t.key ? '#4ADE80' : 'transparent' }}
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
