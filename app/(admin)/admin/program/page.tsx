"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { BookOpen, Activity, PenLine, HelpCircle, Eye, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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
  unlocked: i < 2 || (i === 2 && true),
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
    { type: "Exercise", title: "4-7-8 Breathing Exercise", duration: "5 min", desc: "A guided breathing exercise to manage cravings and anxiety. Routes to Breathing Tool.", preview: true },
    { type: "Journal Prompt", title: "Your Why", duration: "10 min", desc: "Write about your reasons for choosing this recovery journey.", preview: true },
    { type: "Quiz", title: "Foundations Knowledge Check", duration: "5 min", desc: "5 questions", questions: 5 },
    { type: "Lesson", title: "Setting Your First Goals", duration: "12 min", desc: "Learn how to set SMART recovery goals that keep you motivated...", preview: true },
  ],
  2: [
    { type: "Lesson", title: "Identifying Your Triggers", duration: "18 min", desc: "Recognise the people, places, and emotions that trigger cannabis cravings...", preview: true },
    { type: "Journal Prompt", title: "Trigger Mapping", duration: "12 min", desc: "Map out your personal triggers using the framework from today's lesson.", preview: true },
    { type: "Exercise", title: "Grounding Techniques (5-4-3-2-1)", duration: "6 min", desc: "A sensory grounding exercise for moments of intense craving. Routes to Mindfulness Centre.", preview: true },
    { type: "Quiz", title: "Triggers & Responses", duration: "5 min", desc: "5 questions", questions: 5 },
    { type: "Lesson", title: "Building Your Support System", duration: "14 min", desc: "Identify the key people in your life who can support your recovery journey...", preview: true },
  ],
  3: [
    { type: "Lesson", title: "Emotional Regulation Basics", duration: "16 min", desc: "Understanding how cannabis has affected your emotional processing...", preview: true },
    { type: "Exercise", title: "Body Scan Meditation", duration: "10 min", desc: "A guided body scan to build awareness of physical sensations. Routes to Mindfulness Centre.", preview: true },
    { type: "Journal Prompt", title: "Feelings Check", duration: "8 min", desc: "Describe three emotions you experienced today and how you handled them.", preview: true },
    { type: "Lesson", title: "Coping Without Cannabis", duration: "15 min", desc: "Practical strategies for managing difficult emotions without turning to substances...", preview: true },
    { type: "Quiz", title: "Emotional Awareness", duration: "5 min", desc: "5 questions", questions: 5 },
  ],
}

const stats = [
  { label: "Completion Rate", value: "73%" },
  { label: "Avg Time to Complete", value: "5.2 days" },
  { label: "Top Activity", value: "4-7-8 Breathing" },
  { label: "User Rating", value: "4.2/5 ★" },
]

for (let i = 4; i <= 10; i++) {
  weekActivities[i] = [
    { type: "Lesson", title: `Week ${i} Core Lesson`, duration: "15 min", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit...", preview: false },
    { type: "Exercise", title: "Daily Mindfulness Practice", duration: "8 min", desc: "Continue building your mindfulness routine.", preview: false },
    { type: "Journal Prompt", title: "Week " + i + " Reflection", duration: "10 min", desc: "Reflect on your progress this week.", preview: false },
  ]
}

export default function AdminProgramPage() {
  const [tier, setTier] = useState("moderate")
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [previewQuiz, setPreviewQuiz] = useState<ActivityItem | null>(null)
  const [toggles, setToggles] = useState<Record<string, boolean>>({})

  const currentActivities = weekActivities[selectedWeek] || []

  return (
    <div id="main-content" className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Program Manager</h1>
        <p className="text-sm text-muted-foreground">Manage recovery program content across all three tiers</p>
      </div>

      <div className="flex gap-1 rounded-2xl border bg-white p-1 w-fit">
        {tiers.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTier(t.key); setSelectedWeek(1) }}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              tier === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 space-y-1">
          <div className="rounded-2xl border bg-white p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-2">WEEKS</p>
            {weeks.map((w) => (
              <button
                key={w.num}
                onClick={() => setSelectedWeek(w.num)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  selectedWeek === w.num ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedWeek === w.num ? "bg-primary text-primary-foreground" : w.completed ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                }`}>{w.num}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium truncate">{w.title}</p>
                  <p className="text-[9px] text-muted-foreground">{w.activities} activities</p>
                </div>
                {w.completed && <span className="size-2 rounded-full bg-green-500 shrink-0" />}
              </button>
            ))}
          </div>
        </aside>

        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border bg-white p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Week {selectedWeek}</span>
              <div>
                <h2 className="text-base font-semibold">{weeks[selectedWeek - 1]?.title}</h2>
                <p className="text-xs text-muted-foreground">{weeks[selectedWeek - 1]?.theme}</p>
              </div>
              <span className={`ml-auto text-xs font-medium ${selectedWeek <= 2 ? "text-green-600" : "text-muted-foreground"}`}>
                {selectedWeek <= 2 ? "Unlocked" : "Locked by default"}
              </span>
            </div>

            <div className="space-y-3">
              {currentActivities.map((act, i) => {
                const Icon = activityIcons[act.type] || BookOpen
                const toggled = toggles[`${selectedWeek}-${i}`]

                return (
                  <div key={i} className="rounded-xl border bg-white p-4">
                    <div className="flex items-start gap-3">
                      <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-medium text-primary bg-primary/5 rounded-full px-2 py-0.5">{act.type}</span>
                          <span className="text-[10px] text-muted-foreground">{act.duration}</span>
                          {act.type === "Quiz" && <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">{act.questions} questions</span>}
                        </div>
                        <p className="text-sm font-medium mt-1">{act.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{act.desc}{act.preview ? "…" : ""}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 border-t pt-3">
                      <Tooltip>
                        <TooltipTrigger render={
                          <Button className="rounded-full h-7 text-[10px] bg-white border border-muted-foreground/20 text-muted-foreground hover:bg-muted">
                            Edit Content
                          </Button>
                        } />
                        <TooltipContent>Content editing available in production</TooltipContent>
                      </Tooltip>
                      {act.type === "Quiz" && (
                        <Button
                          onClick={() => setPreviewQuiz(act)}
                          className="rounded-full h-7 text-[10px] bg-white border border-muted-foreground/20 text-muted-foreground hover:bg-muted"
                        >
                          <Eye className="size-3 mr-1" /> Preview
                        </Button>
                      )}
                      <button
                        onClick={() => setToggles((p) => ({ ...p, [`${selectedWeek}-${i}`]: !toggled }))}
                        className="flex items-center gap-1.5 ml-auto text-xs text-muted-foreground hover:text-foreground"
                      >
                        {toggled ? <ToggleRight className="size-4 text-green-600" /> : <ToggleLeft className="size-4" />}
                        {toggled ? "Active" : "Inactive"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border bg-amber-50 border-amber-200 p-3">
              <p className="text-[10px] text-amber-800"><strong>Week 3</strong> has the highest skip rate (27%). Consider reviewing the content difficulty.</p>
            </div>
            <div className="rounded-xl border bg-green-50 border-green-200 p-3">
              <p className="text-[10px] text-green-800"><strong>4-7-8 Breathing</strong> has a 94% completion rate — most popular tool.</p>
            </div>
            <div className="rounded-xl border bg-blue-50 border-blue-200 p-3">
              <p className="text-[10px] text-blue-800"><strong>Quiz scores</strong> average 78% across all users. Learning objectives appear to be met.</p>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3">WEEK {selectedWeek} STATISTICS</p>
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <span className="text-xs font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {previewQuiz && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold">{previewQuiz.title}</h3>
              <button onClick={() => setPreviewQuiz(null)} className="size-8 rounded-lg flex items-center justify-center hover:bg-muted" aria-label="Close preview">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {["What is the first step in managing a cannabis craving?", "Which breathing technique is most effective for acute cravings?", "What does SMART stand for in goal setting?", "How long does a typical cannabis craving last?", "Which of the following is a common trigger for cannabis use?"].map((q, i) => (
                <div key={i} className="rounded-xl border bg-muted/20 p-3">
                  <p className="text-xs font-medium mb-2">{i + 1}. {q}</p>
                  <div className="space-y-1">
                    {[`Option A${i + 1}`, `Option B${i + 1}`, `Option C${i + 1}`, `Option D${i + 1}`].map((opt, j) => (
                      <div key={j} className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${j === 0 ? "bg-green-100 text-green-700 font-medium" : "text-muted-foreground"}`}>
                        <span className="size-4 rounded-full border flex items-center justify-center text-[9px]">{String.fromCharCode(65 + j)}</span>
                        {opt} {j === 0 && <span className="text-[9px] ml-auto text-green-600">✓ Correct</span>}
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
