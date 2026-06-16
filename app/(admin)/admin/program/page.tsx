"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { BookOpen, Activity, PenLine, HelpCircle, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const tiers = [
  { key: "mild", label: "Mild (6 weeks)" },
  { key: "moderate", label: "Moderate (10 weeks)" },
  { key: "heavy", label: "Heavy (16 weeks)" },
]

const weeks = Array.from({ length: 10 }, (_, i) => ({
  num: i + 1,
  title: ["Foundations", "Understanding Triggers", "Building Resilience", "Emotional Regulation", "Healthy Routines", "Social Connections", "Relapse Prevention", "Mindfulness & Reflection", "Life After Recovery", "Graduation & Beyond"][i],
  activities: i + 1,
  completed: i < 3,
  theme: ["Building your recovery foundation", "Identifying personal triggers", "Developing emotional strength", "Managing feelings without substances", "Creating sustainable daily habits", "Navigating social situations", "Preparing for long-term success", "Deepening self-awareness", "Planning your new chapter", "Celebrating your journey"][i],
}))

interface ActivityItem {
  type: string
  title: string
  duration: string
  desc: string
  preview?: boolean
  questions?: number
}

const activityIcons: Record<string, LucideIcon> = {
  Lesson: BookOpen,
  Exercise: Activity,
  "Journal Prompt": PenLine,
  Quiz: HelpCircle,
}

const weekActivities: Record<number, ActivityItem[]> = {
  1: [
    { type: "Lesson", title: "Understanding Your Relationship with Cannabis", duration: "15 min", desc: "This lesson helps you explore your personal patterns of cannabis use...", preview: true },
    { type: "Exercise", title: "4-7-8 Breathing Exercise", duration: "5 min", desc: "A guided breathing exercise to manage cravings and anxiety.", preview: true },
    { type: "Journal Prompt", title: "Your Why", duration: "10 min", desc: "Write about your reasons for choosing this recovery journey.", preview: true },
    { type: "Quiz", title: "Foundations Knowledge Check", duration: "5 min", desc: "5 questions", questions: 5 },
    { type: "Lesson", title: "Setting Your First Goals", duration: "12 min", desc: "Learn how to set SMART recovery goals that keep you motivated...", preview: true },
  ],
  2: [
    { type: "Lesson", title: "Identifying Your Triggers", duration: "18 min", desc: "Recognise the people, places, and emotions that trigger cannabis cravings...", preview: true },
    { type: "Journal Prompt", title: "Trigger Mapping", duration: "12 min", desc: "Map out your personal triggers using the framework from today's lesson.", preview: true },
    { type: "Exercise", title: "Grounding Techniques (5-4-3-2-1)", duration: "6 min", desc: "A sensory grounding exercise for moments of intense craving.", preview: true },
    { type: "Quiz", title: "Triggers & Responses", duration: "5 min", desc: "5 questions", questions: 5 },
    { type: "Lesson", title: "Building Your Support System", duration: "14 min", desc: "Identify the key people in your life who can support your recovery journey...", preview: true },
  ],
  3: [
    { type: "Lesson", title: "Emotional Regulation Basics", duration: "16 min", desc: "Understanding how cannabis has affected your emotional processing...", preview: true },
    { type: "Exercise", title: "Body Scan Meditation", duration: "10 min", desc: "A guided body scan to build awareness of physical sensations.", preview: true },
    { type: "Journal Prompt", title: "Feelings Check", duration: "8 min", desc: "Describe three emotions you experienced today and how you handled them.", preview: true },
    { type: "Lesson", title: "Coping Without Cannabis", duration: "15 min", desc: "Practical strategies for managing difficult emotions without turning to substances...", preview: true },
    { type: "Quiz", title: "Emotional Awareness", duration: "5 min", desc: "5 questions", questions: 5 },
  ],
}

for (let i = 4; i <= 10; i++) {
  weekActivities[i] = [
    { type: "Lesson", title: `Week ${i} Core Lesson`, duration: "15 min", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit...", preview: false },
    { type: "Exercise", title: "Daily Mindfulness Practice", duration: "8 min", desc: "Continue building your mindfulness routine.", preview: false },
    { type: "Journal Prompt", title: "Week " + i + " Reflection", duration: "10 min", desc: "Reflect on your progress this week.", preview: false },
  ]
}

const tierLabels: Record<string, string> = {
  mild: "Mild (6 weeks) — educational & habit-building focus",
  moderate: "Moderate (10 weeks) — structured therapeutic content",
  heavy: "Heavy (16 weeks) — intensive clinical & emotional support",
}

const tierWeekCounts: Record<string, number> = { mild: 6, moderate: 10, heavy: 16 }

const stats = [
  { label: "Completion Rate", value: "73%" },
  { label: "Avg Time to Complete", value: "5.2 days" },
  { label: "Top Activity", value: "4-7-8 Breathing" },
  { label: "User Rating", value: "4.2/5" },
]

export default function AdminProgramPage() {
  const [tier, setTier] = useState("moderate")
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [previewQuiz, setPreviewQuiz] = useState<ActivityItem | null>(null)
  const [toggles, setToggles] = useState<Record<string, boolean>>({})
  const [editingContent, setEditingContent] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [descriptions, setDescriptions] = useState<Record<string, string>>({})

  const maxWeeks = tierWeekCounts[tier] || 10
  const tierWeeks = weeks.slice(0, maxWeeks)
  const currentActivities = weekActivities[selectedWeek] || []

  return (
    <div id="main-content" className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-foreground">Program Manager</h1>
        <p className="text-sm text-muted-foreground">{tierLabels[tier]}</p>
      </div>

      <div className="bg-muted rounded-xl p-1 flex gap-1 w-fit">
        {tiers.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTier(t.key); setSelectedWeek(1) }}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
              tier === t.key
                ? "bg-card shadow-sm text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 space-y-1">
          <div className="rounded-2xl bg-card p-3" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
            <p className="eyebrow mb-2 px-1">Weeks</p>
            {tierWeeks.map((w) => (
              <button
                key={w.num}
                onClick={() => setSelectedWeek(w.num)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                  selectedWeek === w.num
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className={`size-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  selectedWeek === w.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>{w.num}</span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-xs font-medium truncate text-foreground">{w.title}</p>
                </div>
                {w.completed && (
                  <span className="size-2 rounded-full bg-green-500 ml-auto shrink-0" />
                )}
              </button>
            ))}
          </div>
        </aside>

        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl bg-card p-5" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-0.5 text-xs font-semibold">Week {selectedWeek}</span>
              <div>
                <h2 className="text-base font-semibold text-foreground">{tierWeeks[selectedWeek - 1]?.title || `Week ${selectedWeek}`}</h2>
                <p className="text-xs text-muted-foreground">{tierWeeks[selectedWeek - 1]?.theme || ""}</p>
              </div>
              <span className={`ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                selectedWeek <= 2
                  ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20"
                  : "text-muted-foreground"
              }`}>
                {selectedWeek <= 2 ? <><CheckCircle className="size-3" /> Unlocked</> : null}
              </span>
            </div>

            <div className="space-y-3">
              {currentActivities.map((act, i) => {
                const Icon = activityIcons[act.type] || BookOpen
                const toggled = toggles[`${selectedWeek}-${i}`]

                return (
                  <div key={i} className="rounded-2xl bg-card p-4 mb-3" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
                    <div className="flex items-start gap-3">
                      <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex rounded-full bg-primary/12 text-primary text-[10px] font-semibold px-2.5 py-0.5">{act.type}</span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3" /> {act.duration}
                          </span>
                          {act.type === "Quiz" && <span className="tag-secondary text-[10px]">{act.questions} questions</span>}
                        </div>
                        <p className="text-sm font-semibold text-foreground mt-1">{act.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{(descriptions[`${selectedWeek}-${i}`] || act.desc)}{act.preview ? "…" : ""}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 border-t border-border pt-3">
                      {editingContent === `${selectedWeek}-${i}` ? (
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                            autoFocus
                          />
                          <Button
                            onClick={() => {
                              setDescriptions((p) => ({ ...p, [`${selectedWeek}-${i}`]: editValue }))
                              setEditingContent(null)
                              toast.success("Content updated")
                            }}
                            className="rounded-lg h-7 text-[10px] bg-primary text-primary-foreground"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingContent(null)}
                            variant="ghost"
                            className="rounded-lg h-7 text-[10px]"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            setEditingContent(`${selectedWeek}-${i}`)
                            setEditValue(descriptions[`${selectedWeek}-${i}`] || act.desc)
                          }}
                          className="rounded-xl h-7 text-xs bg-muted text-foreground hover:bg-muted/80 border border-border"
                        >
                          Edit Content
                        </Button>
                      )}
                      {act.type === "Quiz" && (
                        <Button
                          onClick={() => setPreviewQuiz(act)}
                          className="rounded-xl h-7 text-xs bg-muted text-foreground hover:bg-muted/80 border border-border"
                        >
                          <Eye className="size-3 mr-1" /> Preview
                        </Button>
                      )}
                      <button
                        onClick={() => setToggles((p) => ({ ...p, [`${selectedWeek}-${i}`]: !toggled }))}
                        className={`flex items-center gap-1.5 ml-auto text-xs font-medium transition-colors ${
                          toggled ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {toggled ? <CheckCircle className="size-4" /> : <XCircle className="size-4" />}
                        {toggled ? "Active" : "Inactive"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-accent/20 bg-accent/8 p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Week 3</strong> has the highest skip rate (27%). Consider reviewing the content difficulty.
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/8 p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">4-7-8 Breathing</strong> has a 94% completion rate &mdash; most popular tool.
            </div>
            <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
              <strong className="text-foreground">Quiz scores</strong> average 78% across all users. Learning objectives appear to be met.
            </div>
          </div>
        </div>

        <aside className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl bg-muted/50 p-4" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
            <p className="eyebrow mb-3">Week {selectedWeek} Statistics</p>
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <span className={`text-xs font-semibold ${
                  s.label === "Top Activity" ? "text-primary" : "text-foreground"
                }`}>
                  {s.label === "User Rating" ? (
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < 4 ? "text-amber-400" : "text-muted-foreground/30"}>★</span>
                      ))}
                    </span>
                  ) : s.value}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {previewQuiz && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12">
          <div className="w-full max-w-lg rounded-2xl bg-card p-6 mx-4" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4), 0 8px 32px hsl(160 28% 4% / 0.4)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">{previewQuiz.title}</h3>
              <button onClick={() => setPreviewQuiz(null)} className="size-8 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground" aria-label="Close preview">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {["What is the first step in managing a cannabis craving?", "Which breathing technique is most effective for acute cravings?", "What does SMART stand for in goal setting?", "How long does a typical cannabis craving last?", "Which of the following is a common trigger for cannabis use?"].map((q, i) => (
                <div key={i} className="rounded-xl bg-muted/30 p-3" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
                  <p className="text-xs font-medium text-foreground mb-2">{i + 1}. {q}</p>
                  <div className="space-y-1">
                    {[`Option A${i + 1}`, `Option B${i + 1}`, `Option C${i + 1}`, `Option D${i + 1}`].map((opt, j) => (
                      <div key={j} className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${j === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"}`}>
                        <span className="size-4 rounded-full border border-border flex items-center justify-center text-[9px]">
                          {String.fromCharCode(65 + j)}
                        </span>
                        {opt} {j === 0 && <span className="text-[9px] ml-auto text-primary flex items-center gap-0.5"><CheckCircle className="size-2.5" /> Correct</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
