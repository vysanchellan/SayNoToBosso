"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Footprints, Flame, Star, Shield, Zap, Trophy, Crown, Medal, Gem, Diamond, Sun,
  BookOpen, GraduationCap, Target, FlaskConical, Award,
  Droplets, Moon, Wind, PenLine, Activity,
  Sunrise, Brain, Heart, Search,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Badge {
  id: string
  name: string
  icon: LucideIcon
  category: string
  description: string
  daysRequired?: number
  unlocked: boolean
  earnedDate?: string
  progress?: number
  progressLabel?: string
}

const allBadges: Badge[] = [
  { id: "s1", name: "First Step", icon: Footprints, category: "Sobriety", description: "Complete 1 day without cannabis.", daysRequired: 1, unlocked: true, earnedDate: "15 May 2026" },
  { id: "s2", name: "Three Days Strong", icon: Flame, category: "Sobriety", description: "Stay cannabis-free for 3 days.", daysRequired: 3, unlocked: true, earnedDate: "17 May 2026" },
  { id: "s3", name: "One Week Hero", icon: Star, category: "Sobriety", description: "Complete your first full week.", daysRequired: 7, unlocked: true, earnedDate: "21 May 2026" },
  { id: "s4", name: "Fortnight Free", icon: Shield, category: "Sobriety", description: "Reach 14 days of recovery.", daysRequired: 14, unlocked: true, earnedDate: "28 May 2026" },
  { id: "s5", name: "21 Days", icon: Zap, category: "Sobriety", description: "21 days of commitment.", daysRequired: 21, unlocked: false, progress: 67, progressLabel: "7 days away" },
  { id: "s6", name: "One Month", icon: Trophy, category: "Sobriety", description: "One full month of recovery.", daysRequired: 30, unlocked: false, progress: 47, progressLabel: "16 days away" },
  { id: "s7", name: "6 Weeks", icon: Crown, category: "Sobriety", description: "42 days of strength.", daysRequired: 42, unlocked: false, progress: 33, progressLabel: "28 days away" },
  { id: "s8", name: "Two Months", icon: Medal, category: "Sobriety", description: "60 days of transformation.", daysRequired: 60, unlocked: false, progress: 23, progressLabel: "46 days away" },
  { id: "s9", name: "Three Months", icon: Gem, category: "Sobriety", description: "90 days of healing.", daysRequired: 90, unlocked: false, progress: 16, progressLabel: "76 days away" },
  { id: "s10", name: "Six Months", icon: Diamond, category: "Sobriety", description: "180 days of freedom.", daysRequired: 180, unlocked: false },
  { id: "s11", name: "One Year", icon: Sun, category: "Sobriety", description: "365 days of a new life.", daysRequired: 365, unlocked: false },
  { id: "p1", name: "First Lesson", icon: BookOpen, category: "Program", description: "Complete your first lesson.", unlocked: true, earnedDate: "16 May 2026" },
  { id: "p2", name: "Week 1 Graduate", icon: GraduationCap, category: "Program", description: "Complete all activities in Week 1.", unlocked: true, earnedDate: "21 May 2026" },
  { id: "p3", name: "Halfway There", icon: Target, category: "Program", description: "Complete 50% of the program.", unlocked: false, progress: 30, progressLabel: "Week 5" },
  { id: "p4", name: "Knowledge Seeker", icon: FlaskConical, category: "Program", description: "Read 5 research articles.", unlocked: false, progress: 60, progressLabel: "3 of 5" },
  { id: "p5", name: "Program Complete", icon: Award, category: "Program", description: "Complete the full CannaClear program.", unlocked: false },
  { id: "w1", name: "Hydration Hero", icon: Droplets, category: "Wellness", description: "Hit hydration goal 7 days in a row.", unlocked: false, progress: 43, progressLabel: "3 of 7" },
  { id: "w2", name: "Sleep Champion", icon: Moon, category: "Wellness", description: "Log 7 consecutive nights of sleep.", unlocked: false, progress: 29, progressLabel: "2 of 7" },
  { id: "w3", name: "Breathing Master", icon: Wind, category: "Wellness", description: "Complete 10 breathing sessions.", unlocked: false, progress: 20, progressLabel: "2 of 10" },
  { id: "w4", name: "Journal Keeper", icon: PenLine, category: "Wellness", description: "Write 10 journal entries.", unlocked: false, progress: 30, progressLabel: "3 of 10" },
  { id: "w5", name: "Movement Maker", icon: Activity, category: "Wellness", description: "Log exercise 5 days in a row.", unlocked: false, progress: 40, progressLabel: "2 of 5" },
  { id: "sp1", name: "Early Bird", icon: Sunrise, category: "Special", description: "Complete morning check-in before 8am for 5 days.", unlocked: false, progress: 20, progressLabel: "1 of 5" },
  { id: "sp2", name: "Reflector", icon: Brain, category: "Special", description: "Write a 200+ word journal entry.", unlocked: true, earnedDate: "25 May 2026" },
  { id: "sp3", name: "Helping Hand", icon: Heart, category: "Special", description: "Share progress with care team 3 times.", unlocked: false },
  { id: "sp4", name: "Research Rabbit", icon: Search, category: "Special", description: "Read all 12 articles in the Research Library.", unlocked: false },
]

const tabs = ["All", "Sobriety", "Program", "Wellness", "Special"]

export default function AchievementsGrid() {
  const [tab, setTab] = useState("All")

  const filtered = tab === "All" ? allBadges : allBadges.filter((b) => b.category === tab)

  const stats = {
    streak: 14,
    earned: allBadges.filter((b) => b.unlocked).length,
    nextDaysAway: 7,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-gradient-to-br from-accent/10 to-white p-4 text-center">
          <p className="text-2xl font-bold text-accent">{stats.streak}</p>
          <p className="text-xs text-muted-foreground mt-1">Current Streak 🔥</p>
        </div>
        <div className="rounded-2xl border bg-gradient-to-br from-primary/10 to-white p-4 text-center">
          <p className="text-2xl font-bold text-primary">{stats.earned}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Badges Earned</p>
        </div>
        <div className="rounded-2xl border bg-gradient-to-br from-secondary/10 to-white p-4 text-center">
          <p className="text-2xl font-bold text-secondary">{stats.nextDaysAway}</p>
          <p className="text-xs text-muted-foreground mt-1">Days to Next Milestone</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((badge) => (
          <Dialog key={badge.id}>
            <DialogTrigger render={
              <button
                className="group flex flex-col items-center gap-2 p-4"
                aria-label={badge.name}
              />
            }>
              <div
                className={`relative flex size-24 items-center justify-center rounded-full border-2 transition-all ${
                  badge.unlocked
                    ? "border-accent/60 bg-gradient-to-br from-accent/20 to-accent/5 shadow-lg shadow-accent/20 group-hover:scale-105 group-hover:shadow-accent/40"
                    : "border-muted-foreground/20 bg-muted/20 group-hover:border-muted-foreground/40"
                }`}
              >
                <badge.icon
                  className={`size-8 ${badge.unlocked ? "text-accent" : "text-muted-foreground/40"}`}
                />
              </div>
              <span className={`text-xs font-medium text-center ${badge.unlocked ? "text-foreground" : "text-muted-foreground/50"}`}>
                {badge.name}
              </span>
              {!badge.unlocked && badge.progressLabel && (
                <span className="text-[9px] text-muted-foreground/40">{badge.progressLabel}</span>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <div className="flex flex-col items-center py-4">
                  <div className={`flex size-28 items-center justify-center rounded-full border-3 mb-4 ${
                    badge.unlocked ? "border-accent bg-gradient-to-br from-accent/20 to-accent/5 shadow-lg shadow-accent/20" : "border-muted bg-muted/20"
                  }`}>
                    <badge.icon className={`size-10 ${badge.unlocked ? "text-accent" : "text-muted-foreground/40"}`} />
                  </div>
                  <DialogTitle className="text-lg">{badge.name}</DialogTitle>
                  <DialogDescription className="text-center mt-1">
                    {badge.category}
                  </DialogDescription>
                </div>
              </DialogHeader>
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">{badge.description}</p>
                {badge.unlocked && badge.earnedDate && (
                  <p className="text-sm text-primary font-medium">
                    Earned on {badge.earnedDate}
                  </p>
                )}
                {!badge.unlocked && badge.progress !== undefined && (
                  <div className="space-y-1">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${badge.progress}%` }} />
                    </div>
                    {badge.progressLabel && (
                      <p className="text-xs text-muted-foreground">{badge.progressLabel}</p>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
