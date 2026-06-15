"use client"

import { useState, useMemo } from "react"
import { AnimatePresence } from "framer-motion"
import { BookOpen, Award, Calendar, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import programData from "@/data/programs.json"
import WeekCard from "@/components/features/program/WeekCard"
import LessonViewer from "@/components/features/program/LessonViewer"
import QuizCard from "@/components/features/program/QuizCard"
import JournalPrompt from "@/components/features/program/JournalPrompt"

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Activity {
  id: string
  type: string
  title: string
  duration: string
  completed: boolean
  prompt?: string
  questions?: Question[]
  content?: string
}

interface Week {
  weekNumber: number
  title: string
  theme: string
  color: string
  unlocked: boolean
  completed: boolean
  activities: Activity[]
}

interface TierData {
  totalWeeks: number
  weeks: Week[]
}

const progData = programData as { tiers: { moderate: TierData } }

function calcProgress(weeks: Week[]) {
  let done = 0
  let total = 0
  for (const w of weeks) {
    for (const a of w.activities) {
      total++
      if (a.completed) done++
    }
  }
  return { done, total }
}

function calcCurrentWeek(weeks: Week[]) {
  for (const w of weeks) {
    if (w.unlocked && !w.completed) {
      const done = w.activities.filter((a) => a.completed).length
      return { week: w.weekNumber, done, total: w.activities.length }
    }
  }
  return { week: 2, done: 0, total: 5 }
}

export default function ProgramPage() {
  const tier = progData.tiers.moderate
  const weeks = tier.weeks

  const [activeLesson, setActiveLesson] = useState<string | null>(null)
  const [activeQuiz, setActiveQuiz] = useState<Activity | null>(null)
  const [activeJournal, setActiveJournal] = useState<Activity | null>(null)
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null)

  const overallCompleted = useMemo(() => calcProgress(weeks), [weeks])
  const currentWeekCompleted = useMemo(() => calcCurrentWeek(weeks), [weeks])

  const progressPercent = (overallCompleted.done / overallCompleted.total) * 100

  const handleStartActivity = (activity: Activity) => {
    setQuizScore(null)
    if (activity.type === "lesson") {
      setActiveLesson(activity.id)
    } else if (activity.type === "quiz") {
      setActiveQuiz(activity)
    } else if (activity.type === "journal") {
      setActiveJournal(activity)
    }
  }

  const handleQuizComplete = (score: number) => {
    setQuizScore({ score, total: activeQuiz?.questions?.length || 0 })
    setActiveQuiz(null)
  }

  return (
    <div id="main-content" className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">My Recovery Program</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
            Moderate Use — 10 Week Program
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Calendar className="size-3" />
            Week {currentWeekCompleted.week} of 10
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary">
            <BookOpen className="size-3" />
            {currentWeekCompleted.done} of {currentWeekCompleted.total} this week
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
            <Award className="size-3" />
            {overallCompleted.done} Activities Complete
          </span>
        </div>
      </div>

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-4">
        {weeks.map((week: Week) => (
          <WeekCard key={week.weekNumber} week={week} onStartActivity={handleStartActivity} />
        ))}
      </div>

      {quizScore && (
        <div className="rounded-2xl border bg-card p-6 text-center" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full" style={{ background: quizScore.score === quizScore.total ? 'hsl(var(--accent) / 0.15)' : 'hsl(var(--primary) / 0.1)' }}>
            {quizScore.score === quizScore.total ? <Award className="size-7" style={{ color: 'hsl(var(--accent))' }} /> : <Check className="size-7" style={{ color: 'hsl(var(--primary))' }} />}
          </div>
          <h3 className="text-xl font-semibold" style={{ color: 'hsl(var(--forest))' }}>{quizScore.score}/{quizScore.total} Correct</h3>
          <p className="text-sm mt-1" style={{ color: 'hsl(var(--text-secondary))' }}>
            {quizScore.score === quizScore.total ? "Perfect score!" : quizScore.score >= quizScore.total * 0.8 ? "Great work!" : "Keep going!"}
          </p>
          <Button onClick={() => setQuizScore(null)} className="mt-4 rounded-full" variant="outline">Dismiss</Button>
        </div>
      )}

      {activeLesson && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background" onClick={(e) => { if (e.target === e.currentTarget) setActiveLesson(null) }}>
          <div className="min-h-full">
            <LessonViewer
              key="lesson"
              lessonId={activeLesson}
              onClose={() => setActiveLesson(null)}
              onComplete={() => setActiveLesson(null)}
            />
          </div>
        </div>
      )}

      {activeQuiz && activeQuiz.questions && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'hsl(var(--background) / 0.95)' }}>
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
              <div className="flex justify-end mb-2">
                <button onClick={() => setActiveQuiz(null)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Close quiz">
                  <X className="size-5" />
                </button>
              </div>
              <QuizCard
                questions={activeQuiz.questions}
                onComplete={handleQuizComplete}
                onBack={() => setActiveQuiz(null)}
              />
            </div>
          </div>
        </div>
      )}

      {activeJournal && activeJournal.prompt && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
          <div className="min-h-full">
            <JournalPrompt
              key="journal"
              prompt={activeJournal.prompt}
              onSave={() => {}}
              onClose={() => setActiveJournal(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
