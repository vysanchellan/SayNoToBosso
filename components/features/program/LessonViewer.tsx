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
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#07100B' }}>
        <p style={{ color: '#74917B' }}>Lesson content not found.</p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'rgba(7,16,11,0.95)' }}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="min-h-full flex items-center justify-center p-4"
      >
        <div className="w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden" style={{ background: '#0E1A12', borderColor: '#1F3326' }}>
          <header className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4" style={{ background: '#0E1A12', borderColor: '#1F3326' }}>
            <div className="flex items-center gap-3">
              <BookOpen className="size-5" style={{ color: '#4ADE80' }} />
              <span className="text-sm font-medium" style={{ color: '#F2F7F1' }}>Lesson</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs" style={{ color: '#74917B' }}>{scrollPercent}% read</span>
              <button onClick={onClose} className="p-1" style={{ color: '#74917B' }} aria-label="Close lesson">
                <X className="size-5" />
              </button>
            </div>
          </header>

          <div className="h-1" style={{ backgroundColor: '#142219' }}>
            <div className="h-full transition-all duration-150" style={{ width: `${scrollPercent}%`, backgroundColor: '#4ADE80' }} />
          </div>

          <div
            id="lesson-scroll-container"
            className="overflow-y-auto max-h-[75vh]"
          >
            <article className="px-6 py-8 space-y-8">
              {lesson.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: '#F2F7F1' }}>{section.heading}</h2>
                  <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(242,247,241,0.8)' }}>
                    {section.body}
                  </div>
                  {section.heading.includes("Takeaway") && (
                    <div className="mt-4 rounded-xl p-4" style={{ border: '1px solid rgba(74,222,128,0.3)', backgroundColor: 'rgba(74,222,128,0.1)' }}>
                      <p className="text-sm font-medium" style={{ color: '#4ADE80' }}>Key Takeaway</p>
                      <p className="text-sm mt-1" style={{ color: 'rgba(242,247,241,0.8)' }}>{section.body.split("\n\n").pop()}</p>
                    </div>
                  )}
                  {section.heading.includes("Did You Know") && (
                    <div className="mt-4 rounded-xl border p-4 shadow-sm" style={{ background: '#0E1A12', borderColor: '#1F3326' }}>
                      <div className="flex items-start gap-3">
                        <Brain className="size-5 shrink-0 mt-0.5" style={{ color: '#4ADE80' }} />
                        <p className="text-sm" style={{ color: 'rgba(242,247,241,0.8)' }}>{section.body}</p>
                      </div>
                    </div>
                  )}
                  {section.heading.includes("Research") && (
                    <div className="mt-4 rounded-xl p-4" style={{ borderLeft: '4px solid #5EAEEA', backgroundColor: 'rgba(94,174,234,0.05)' }}>
                      <p className="text-sm italic" style={{ color: 'rgba(242,247,241,0.8)' }}>{section.body.split("\n\n").slice(-1)[0]}</p>
                    </div>
                  )}
                </section>
              ))}

              <div className="pt-4 pb-12 text-center">
                <Button
                  onClick={onComplete}
                  className="rounded-full px-8" style={{ backgroundColor: '#4ADE80', color: '#07100B' }}
                >
                  Mark as Complete &amp; Continue
                </Button>
              </div>
            </article>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
