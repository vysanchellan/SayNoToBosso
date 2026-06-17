"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts"
import { AlertTriangle, Mail } from "lucide-react"

const moods = [
  { day: "D1", mood: 3 }, { day: "D3", mood: 4 }, { day: "D5", mood: 3 }, { day: "D7", mood: 5 },
  { day: "D9", mood: 4 }, { day: "D11", mood: 6 }, { day: "D13", mood: 5 }, { day: "D15", mood: 7 },
]

const checkins = [
  { date: "28 May", mood: 7, craving: 3, sleep: "7h", note: "Feeling better today" },
  { date: "27 May", mood: 6, craving: 4, sleep: "6h", note: "Slight headache" },
  { date: "26 May", mood: 5, craving: 5, sleep: "6.5h", note: "Had cravings after lunch" },
  { date: "25 May", mood: 4, craving: 6, sleep: "5h", note: "Struggled to sleep" },
]

interface UserProfileDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: { id: string; name: string; tier: string; day: number; week: number; status: string }
}

export default function UserProfileDrawer({ open, onOpenChange, user }: UserProfileDrawerProps) {
  const [tab, setTab] = useState("overview")
  const [note, setNote] = useState("")

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "checkins", label: "Check-ins" },
    { key: "journal", label: "Journal" },
    { key: "program", label: "Program" },
    { key: "notes", label: "Notes" },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[480px]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">
                {user.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div>
                <p className="text-base font-semibold">{user.name}</p>
                <p className="text-[10px] text-muted-foreground">{user.id} · Enrolled May 2026</p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-2 px-4 pb-3">
          {(() => {
            const tierStyle = user.tier === "Mild"
              ? "bg-primary/10 text-primary border border-primary/20"
              : user.tier === "Moderate"
                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                : "bg-destructive/10 text-destructive border border-destructive/20"
            return <Badge className={`text-[10px] font-medium ${tierStyle}`}>{user.tier}</Badge>
          })()}
          <span className="text-[10px] text-muted-foreground">Day {user.day} · Week {user.week}</span>
          {user.status === "At-Risk" && (
            <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: '#F87171' }}>
              <AlertTriangle className="size-3" /> At-Risk
            </span>
          )}
        </div>

        <div className="flex gap-1 px-4 pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {tab === "overview" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Days in Program", value: String(user.day) },
                  { label: "Streak", value: String(Math.max(0, user.day - 2)) },
                  { label: "Lessons Complete", value: "3" },
                  { label: "Badges Earned", value: "4" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border bg-card p-3 text-center">
                    <p className="text-lg font-bold text-primary">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border bg-card p-3">
                <p className="text-xs font-semibold mb-2">Mood Trend (Last 14 Days)</p>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moods}>
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#74917B" }} axisLine={false} tickLine={false} />
                      <YAxis domain={[1, 10]} tick={{ fontSize: 9, fill: "#74917B" }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke="#4ADE80" strokeWidth={2} dot={{ r: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-xl border bg-card p-3 space-y-2">
                <p className="text-xs font-semibold">Last Check-in</p>
                <p className="text-xs text-muted-foreground">Mood: 7/10 · Cravings: 3/10</p>
                <p className="text-xs italic text-muted-foreground/70">&ldquo;Feeling better today&rdquo;</p>
              </div>
              <div className="rounded-xl border bg-card p-3 flex items-center gap-2">
                <Mail className="size-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">j.*****@email.com</span>
              </div>
            </>
          )}

          {tab === "checkins" && (
            <div className="rounded-xl border bg-card overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-2 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Mood</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Craving</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Sleep</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {checkins.map((c, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="p-2">{c.date}</td>
                      <td className="p-2 font-medium" style={{ color: c.mood < 4 ? '#F87171' : c.mood < 7 ? '#F0B429' : '#4ADE80' }}>{c.mood}</td>
                      <td className="p-2 text-muted-foreground">{c.craving}</td>
                      <td className="p-2 text-muted-foreground">{c.sleep}</td>
                      <td className="p-2 text-muted-foreground italic">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "journal" && (
            <div className="rounded-xl border bg-card p-4 text-center" style={{ borderColor: 'rgba(192,140,15,0.25)' }}>
              <p className="text-sm font-medium" style={{ color: '#F0B429' }}>User has not consented to share journal entries</p>
              <p className="text-xs mt-1" style={{ color: '#C8951F' }}>Journal sharing must be enabled in Privacy settings by the user.</p>
            </div>
          )}

          {tab === "program" && (
            <div className="space-y-3">
              <div className="rounded-xl border bg-card p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold">Overall Progress</span>
                  <span className="text-xs text-muted-foreground">30%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[30%] rounded-full bg-primary" />
                </div>
              </div>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border bg-card px-3 py-2">
                  <span className="text-xs font-medium">Week {i + 1}</span>
                  <span className="text-[10px]" style={{ color: i < 3 ? '#4ADE80' : i === 3 ? '#F0B429' : 'rgba(116,145,123,0.5)' }}>
                    {i < 3 ? "Complete" : i === 3 ? "In Progress" : "Locked"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === "notes" && (
            <div className="space-y-3">
            <div className="rounded-xl border bg-card p-3" style={{ borderColor: 'rgba(192,140,15,0.25)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">Dr. Naledi Sithole</span>
                <span className="text-[10px] text-muted-foreground">28 May 2026</span>
              </div>
              <p className="text-xs text-muted-foreground">Patient reports improved mood. Continue monitoring cravings post-lunch. Consider adjusting program pacing.</p>
            </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a clinical note..."
                className="w-full min-h-[80px] rounded-xl border border-muted-foreground/20 bg-card p-3 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                Add Clinical Note
              </Button>
              <p className="text-[10px] text-muted-foreground/60">Notes are visible to all admin staff, not to the user.</p>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex gap-2">
          <Button className="rounded-full h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90">Schedule Check-in</Button>
          <Button className="rounded-full h-8 text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90">Flag As At-Risk</Button>
          <Button className="rounded-full h-8 text-xs bg-card border border-muted-foreground/20 text-muted-foreground hover:bg-muted">Suspend</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
