"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { X, Brain, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import lessonsData from "@/data/programs.json"

interface Section {
  heading: string
  body: string
}

interface LessonContent {
  sections: Section[]
}

export default function LessonViewer({
  lessonId,
  onClose,
  onComplete,
}: {
  lessonId: string
  onClose: () => void
  onComplete: () => void
}) {
  const [scrollPercent, setScrollPercent] = useState(0)

  const lessons = (lessonsData as { lessons: Record<string, LessonContent> }).lessons
  const lesson = lessons[lessonId]

  const handleScroll = useCallback(() => {
    const el = document.getElementById("lesson-scroll-container")
    if (!el) return
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight - el.clientHeight
    setScrollPercent(scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0)
  }, [])

  useEffect(() => {
    const el = document.getElementById("lesson-scroll-container")
    el?.addEventListener("scroll", handleScroll)
    return () => el?.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  if (!lesson) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Lesson content not found.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <BookOpen className="size-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Lesson</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">{scrollPercent}% read</span>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Close lesson">
            <X className="size-5" />
          </button>
        </div>
      </header>

      <div className="absolute top-14 left-0 right-0 h-1 bg-muted z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${scrollPercent}%` }} />
      </div>

      <div
        id="lesson-scroll-container"
        className="flex-1 overflow-y-auto"
      >
        <article className="mx-auto max-w-2xl px-6 py-8 space-y-8">
          {lesson.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
              <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
              {section.heading.includes("Takeaway") && (
                <div className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-4">
                  <p className="text-sm font-medium text-accent">Key Takeaway</p>
                  <p className="text-sm text-foreground/80 mt-1">{section.body.split("\n\n").pop()}</p>
                </div>
              )}
              {section.heading.includes("Did You Know") && (
                <div className="mt-4 rounded-xl border border-primary/20 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Brain className="size-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">{section.body}</p>
                  </div>
                </div>
              )}
              {section.heading.includes("Research") && (
                <div className="mt-4 rounded-xl border-l-4 border-secondary bg-secondary/5 p-4">
                  <p className="text-sm italic text-foreground/80">{section.body.split("\n\n").slice(-1)[0]}</p>
                </div>
              )}
            </section>
          ))}

          <div className="pt-4 pb-12 text-center">
            <Button
              onClick={onComplete}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              Mark as Complete &amp; Continue
            </Button>
          </div>
        </article>
      </div>
    </motion.div>
  )
}
