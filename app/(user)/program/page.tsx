"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { BookOpen, Award, Calendar, Flame, LayoutList, X, Check, ExternalLink } from "lucide-react"
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
  const [activeExercise, setActiveExercise] = useState<Activity | null>(null)
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
    } else if (activity.type === "exercise") {
      setActiveExercise(activity)
    }
  }

  const handleQuizComplete = (score: number) => {
    setQuizScore({ score, total: activeQuiz?.questions?.length || 0 })
    setActiveQuiz(null)
  }

  return (
    <div id="main-content" className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: '#F2F7F1' }}>My Recovery Program</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: '#142219',
              boxShadow: '0 0 0 1px rgba(31,51,38,0.4)',
              color: '#F2F7F1',
            }}
          >
            <Calendar className="size-3" />
            Week {currentWeekCompleted.week} of 10
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: '#142219',
              boxShadow: '0 0 0 1px rgba(31,51,38,0.4)',
              color: '#F2F7F1',
            }}
          >
            <LayoutList className="size-3" />
            {currentWeekCompleted.done} of {currentWeekCompleted.total} this week
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{ background: 'rgba(240,180,41,0.15)', color: '#F0B429', boxShadow: '0 0 0 1px rgba(240,180,41,0.2)' }}
          >
            <Flame className="size-3" />
            {overallCompleted.done} Activities Complete
          </span>
        </div>
      </div>

      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#142219' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${progressPercent}%`, background: '#4ADE80' }}
        />
      </div>

      <div className="space-y-4">
        {weeks.map((week: Week) => (
          <WeekCard key={week.weekNumber} week={week} onStartActivity={handleStartActivity} />
        ))}
      </div>

      {quizScore && (
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background: '#0E1A12',
            boxShadow: '0 0 0 1px rgba(31,51,38,0.4)',
          }}
        >
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full" style={{ background: 'rgba(240,180,41,0.15)' }}>
            {quizScore.score === quizScore.total ? <Award className="size-7" style={{ color: '#F0B429' }} /> : <Check className="size-7" style={{ color: '#4ADE80' }} />}
          </div>
          <h3 className="text-xl font-semibold" style={{ color: '#F2F7F1' }}>{quizScore.score}/{quizScore.total} Correct</h3>
          <p className="text-sm mt-1" style={{ color: '#74917B' }}>
            {quizScore.score === quizScore.total ? "Perfect score!" : quizScore.score >= quizScore.total * 0.8 ? "Great work!" : "Keep going!"}
          </p>
          <Button onClick={() => setQuizScore(null)} className="mt-4 rounded-full" variant="outline">Dismiss</Button>
        </div>
      )}

      {activeLesson && (
        <LessonViewer
          key="lesson"
          lessonId={activeLesson}
          onClose={() => setActiveLesson(null)}
          onComplete={() => setActiveLesson(null)}
        />
      )}

      {activeQuiz && activeQuiz.questions && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ backgroundColor: 'rgba(7,16,11,0.95)' }}>
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
              <div className="flex justify-end mb-2">
                <button onClick={() => setActiveQuiz(null)} className="p-2" style={{ color: '#74917B' }} aria-label="Close quiz">
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
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ backgroundColor: '#07100B' }}>
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

      {activeExercise && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ backgroundColor: 'rgba(7,16,11,0.95)' }}>
          <div className="min-h-full flex items-center justify-center p-4">
            <div
              className="w-full max-w-md rounded-2xl p-8 text-center"
              style={{
                background: '#0E1A12',
                boxShadow: '0 0 0 1px rgba(31,51,38,0.4), 0 8px 32px rgba(8,17,12,0.4)',
              }}
            >
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ background: 'rgba(94,174,234,0.15)' }}>
                <ExternalLink className="size-6" style={{ color: '#5EAEEA' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#F2F7F1' }}>{activeExercise.title}</h3>
              <p className="text-sm mb-6" style={{ color: '#74917B' }}>This exercise is available in the Daily Tools section.</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => setActiveExercise(null)} variant="outline" className="rounded-full">Cancel</Button>
                <Link href="/tools" onClick={() => setActiveExercise(null)}>
                  <Button className="rounded-full text-white" style={{ background: '#5EAEEA' }}>
                    Open Daily Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
