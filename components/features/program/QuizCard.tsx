"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, ArrowLeft, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export default function QuizCard({
  questions,
  onComplete,
  onBack,
}: {
  questions: Question[]
  onComplete: (score: number) => void
  onBack: () => void
}) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)

  const q = questions[current]
  const isLast = current === questions.length - 1

  const handleSelect = (i: number) => {
    if (revealed) return
    setSelected(i)
  }

  const handleCheck = () => {
    if (selected === null) return
    setRevealed(true)
    setAnswers([...answers, selected === q.correct])
  }

  const handleNext = () => {
    if (isLast) {
      const score = [...answers, selected === q.correct].filter(Boolean).length
      setFinished(true)
      onComplete(score)
    } else {
      setCurrent(current + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  if (finished) {
    const score = answers.filter(Boolean).length
    const total = questions.length
    const perfect = score === total

    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className={`flex size-16 items-center justify-center rounded-full ${perfect ? "bg-accent/20" : "bg-primary/10"}`}>
          {perfect ? <Award className="size-8 text-accent" /> : <Check className="size-8 text-primary" />}
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          {score}/{total} Correct
        </h3>
        <p className="text-sm text-muted-foreground">
          {perfect
            ? "Perfect score! You truly understand this week's material."
            : score >= total * 0.8
              ? "Great work! You're building solid knowledge."
              : "Keep going! Review the lessons and try again."}
        </p>
        {perfect && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Award className="size-3" /> Badge Unlocked!
          </span>
        )}
        <Button onClick={onBack} variant="outline" className="rounded-full mt-2">
          Back to Program
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Back to program">
          <ArrowLeft className="size-5" />
        </button>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                i < current ? "bg-green-500" : i === current ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          {current + 1}/{questions.length}
        </span>
      </div>

      <motion.div
        key={current}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-2xl border bg-card p-6"
      >
        <p className="text-sm font-semibold text-foreground mb-4">{q.question}</p>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let state = ""
            if (revealed && i === q.correct) state = "correct"
            else if (revealed && i === selected && i !== q.correct) state = "wrong"

            const isSelected = selected === i && !revealed

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition-all cursor-pointer ${
                  state === "correct"
                    ? "border-green-500 bg-green-50 text-green-800 ring-2 ring-green-300"
                    : state === "wrong"
                      ? "border-red-400 bg-red-50 text-red-800 ring-2 ring-red-200"
                      : isSelected
                        ? "ring-2 ring-primary/40 text-foreground font-medium"
                        : "border-muted-foreground/20 bg-card text-foreground hover:border-primary/50"
                }`}
                style={isSelected ? { borderColor: 'hsl(var(--primary))', background: 'hsl(var(--primary) / 0.06)' } : {}}
              >
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    state === "correct"
                      ? "bg-green-500 text-white"
                      : state === "wrong"
                        ? "bg-red-500 text-white"
                        : isSelected
                          ? "text-white"
                          : "bg-muted text-muted-foreground"
                  }`}
                  style={isSelected ? { background: 'hsl(var(--primary))' } : {}}
                >
                  {state === "correct" ? <Check className="size-4" /> : state === "wrong" ? <X className="size-4" /> : String.fromCharCode(65 + i)}
                </div>
                <span className={isSelected ? "font-medium" : ""}>{opt}</span>
              </button>
            )
          })}
        </div>

        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-xl p-3 text-sm ${
              selected === q.correct ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"
            }`}
          >
            {q.explanation}
          </motion.div>
        )}

        <div className="mt-6">
          {!revealed ? (
            <Button
              onClick={handleCheck}
              disabled={selected === null}
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              {isLast ? "See Results" : "Next Question"}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
