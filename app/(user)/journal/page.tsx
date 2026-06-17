"use client"

import { useState } from "react"
import JournalSidebar from "@/components/features/journal/JournalSidebar"
import JournalEditor from "@/components/features/journal/JournalEditor"
import JournalEmptyState from "@/components/features/journal/JournalEmptyState"

interface Entry {
  id: string
  title: string
  content: string
  preview: string
  date: string
  relativeDate: string
  tag: string
  mood: string
  isPrivate: boolean
  isShared: boolean
  flagged?: boolean
}

function rd(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}

const d13 = new Date(Date.now() - 86400000 * 13).toISOString()
const d6 = new Date(Date.now() - 86400000 * 6).toISOString()
const d1 = new Date(Date.now() - 86400000 * 1).toISOString()

const defaultEntries: Entry[] = [
  {
    id: "e1",
    title: "Why I'm Here",
    content: "I'm starting this program because I've realised that cannabis has been holding me back for too long. I started using socially in university, but over the past three years it's become a daily habit. I wake up thinking about it, I plan my day around when I can next use, and I've been lying to my family about how much I consume.\n\nYesterday I tried to go just 12 hours without and I couldn't sleep, I was sweating, and I felt so irritable that I snapped at my mother. That was my wake-up call. I want to be present for my life. I want to remember conversations. I want to wake up feeling clear-headed and energised.\n\nThree months from now, I see myself waking up early, going for a run, making breakfast, and actually enjoying the morning instead of reaching for a joint to 'take the edge off'. I want to reconnect with who I was before cannabis became my identity.",
    preview: "I'm starting this program because I've realised that cannabis has been holding me back for too long...",
    date: d13,
    relativeDate: rd(d13),
    tag: "Week 1",
    mood: "😊",
    isPrivate: true,
    isShared: false,
  },
  {
    id: "e2",
    title: "Bad day today — cravings were intense",
    content: "Today was really hard. I woke up and the first thought in my head was about using. It's Day 8 and I thought I was past the worst of it, but this afternoon a wave of cravings hit me so hard I could barely think. I was at the shops and I walked past someone who smelled like weed and my whole body just... ached for it.\n\nI called my sponsor and we talked for 20 minutes. She reminded me that cravings are like waves — they peak and then they pass. And she was right. After about 30 minutes, the intensity faded. I didn't use. That's a win.",
    preview: "Today was really hard. I woke up and the first thought in my head was about using...",
    date: d6,
    relativeDate: rd(d6),
    tag: "Difficult Day",
    mood: "😐",
    isPrivate: true,
    isShared: false,
    flagged: true,
  },
  {
    id: "e3",
    title: "Day 14 — I can't believe I made it this far",
    content: "Two weeks. 14 days. When I started this program, I genuinely didn't think I could make it past the first weekend. But here I am. The first week was brutal — I won't pretend otherwise. The night sweats, the irritability, the insomnia. I felt like I was losing my mind.\n\nBut something shifted around Day 10. I woke up and I didn't feel that immediate fog. I had breakfast and actually tasted my food. I had a conversation with a friend and I remember every detail of it.\n\nI'm proud of myself. I know there's still a long road ahead, but for the first time in years, I believe I can do this.",
    preview: "Two weeks. 14 days. When I started this program, I genuinely didn't think I could make it...",
    date: d1,
    relativeDate: rd(d1),
    tag: "Milestone",
    mood: "🔥",
    isPrivate: true,
    isShared: false,
  },
]

export default function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>(defaultEntries)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showMobileList, setShowMobileList] = useState(true)

  const activeEntry = activeId ? entries.find((e) => e.id === activeId) || null : null

  const handleNew = () => {
    const now = new Date().toISOString()
    const newEntry: Entry = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      preview: "",
      date: now,
      relativeDate: "Today",
      tag: "",
      mood: "",
      isPrivate: true,
      isShared: false,
    }
    setEntries([newEntry, ...entries])
    setActiveId(newEntry.id)
    setShowMobileList(false)
  }

  const handleSave = (updated: Entry) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === updated.id
          ? { ...updated, preview: updated.content.slice(0, 80) }
          : e
      )
    )
  }

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
    setActiveId(null)
  }

  const handleSelect = (id: string) => {
    setActiveId(id)
    setShowMobileList(false)
  }

  return (
    <div id="main-content" className="flex h-[calc(100vh-8rem)] -mx-4 sm:-mx-6 lg:-mx-8">
      <div className={`w-80 shrink-0 overflow-hidden ${showMobileList ? "block" : "hidden lg:block"}`} style={{ borderRight: '1px solid #1F3326' }}>
        <JournalSidebar
          entries={entries}
          activeId={activeId}
          onSelect={handleSelect}
          onNew={handleNew}
        />
      </div>

      <div className={`flex-1 overflow-hidden ${!showMobileList ? "block" : "hidden lg:block"}`}>
        {activeEntry ? (
          <JournalEditor
            key={activeEntry.id}
            entry={activeEntry}
            onSave={(e) => handleSave({ ...e, preview: e.content.slice(0, 80), relativeDate: rd(e.date) })}
            onDelete={handleDelete}
          />
        ) : (
          <JournalEmptyState onNewEntry={handleNew} />
        )}
      </div>
    </div>
  )
}
