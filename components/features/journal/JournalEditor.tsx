"use client"

import { useState, useEffect, useRef } from "react"
import { Lock, Eye, Tag, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const moodEmojis = ["😔", "😐", "😊", "🔥", "💪"]

const tagOptions = [
  { label: "Personal", bg: "rgba(74,222,128,0.15)", color: "#4ADE80" },
  { label: "Milestone", bg: "rgba(240,180,41,0.15)", color: "#F0B429" },
  { label: "Gratitude", bg: "rgba(74,222,128,0.15)", color: "#4ADE80" },
  { label: "Difficult Day", bg: "rgba(248,113,113,0.15)", color: "#F87171" },
] as const

export default function JournalEditor({
  entry,
  onSave,
  onDelete,
  programPrompt,
}: {
  entry: {
    id: string
    title: string
    content: string
    date: string
    tag: string
    mood: string
    isPrivate: boolean
    isShared: boolean
  }
  onSave: (e: {
    id: string
    title: string
    content: string
    date: string
    tag: string
    mood: string
    isPrivate: boolean
    isShared: boolean
  }) => void
  onDelete: (id: string) => void
  programPrompt?: string
}) {
  const [title, setTitle] = useState(entry.title || "")
  const [content, setContent] = useState(entry.content || "")
  const [date, setDate] = useState(entry.date || new Date().toISOString().slice(0, 10))
  const [tag, setTag] = useState(entry.tag || "")
  const [mood, setMood] = useState(entry.mood || "")
  const [isPrivate, setIsPrivate] = useState(entry.isPrivate ?? true)
  const [saved, setSaved] = useState(true)
  const [showDelete, setShowDelete] = useState(false)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

  const persist = (updated: Record<string, string | boolean | undefined>) => {
    setSaved(false)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onSave({
        id: entry.id || crypto.randomUUID(),
        title: (updated.title as string) ?? title,
        content: (updated.content as string) ?? content,
        date: (updated.date as string) ?? date,
        tag: (updated.tag as string) ?? tag,
        mood: (updated.mood as string) ?? mood,
        isPrivate: (updated.isPrivate as boolean) ?? isPrivate,
        isShared: !((updated.isPrivate as boolean) ?? isPrivate),
      })
      setSaved(true)
      toast.info("Entry saved automatically")
    }, 800)
  }

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: '1px solid #1F3326', background: '#0E1A12' }}>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); persist({ date: e.target.value }) }}
            className="rounded-lg px-2 py-1 text-xs outline-none"
            style={{ background: '#142219', color: '#F2F7F1', border: '1px solid #1F3326' }}
          />
          <button
            onClick={() => { setIsPrivate(!isPrivate); persist({ isPrivate: !isPrivate }) }}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors"
            style={{ background: isPrivate ? '#142219' : 'rgba(74,222,128,0.15)', color: isPrivate ? '#74917B' : '#4ADE80' }}
          >
            {isPrivate ? <Lock className="size-3" /> : <Eye className="size-3" />}
            {isPrivate ? "Private" : "Shared"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${saved ? "" : ""}`} style={{ color: saved ? '#74917B' : '#F0B429' }}>
            {saved ? "Saved" : "Saving..."}
          </span>
          {entry.id && (
            <Dialog open={showDelete} onOpenChange={setShowDelete}>
              <DialogTrigger render={<button className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all hover:text-destructive" aria-label="Delete entry" style={{ borderColor: '#1F3326', color: '#74917B' }} />}>
                <Trash2 className="size-3.5" />
                Delete
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Entry</DialogTitle>
                  <DialogDescription>This action cannot be undone. Are you sure you want to delete this entry?</DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton>
                  <Button variant="destructive" onClick={() => { onDelete(entry.id); setShowDelete(false) }} className="rounded-lg">
                    Delete Permanently
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#07100B' }}>
        <div className="mx-auto max-w-2xl px-6 py-6">
          {programPrompt && (
            <div className="mb-6 rounded-xl p-4" style={{ border: '1px solid rgba(240,180,41,0.25)', background: 'rgba(240,180,41,0.06)' }}>
              <div className="flex items-start gap-3">
                <Tag className="size-4 shrink-0 mt-0.5" style={{ color: '#F0B429' }} />
                <p className="text-sm italic" style={{ color: 'rgba(242,247,241,0.8)' }}>{programPrompt}</p>
              </div>
            </div>
          )}

          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); persist({ title: e.target.value }) }}
            placeholder="Entry title..."
            className="w-full border-none bg-transparent text-2xl font-bold outline-none mb-4"
            style={{ color: '#F2F7F1' }}
          />

          <div className="flex gap-1.5 mb-4 flex-wrap">
            {tagOptions.map((t) => {
              const isSelected = tag === t.label
              return (
                <button
                  key={t.label}
                  onClick={() => { setTag(t.label); persist({ tag: t.label }) }}
                  className="rounded-lg px-3 py-1 text-xs font-medium transition-colors"
                  style={{
                    background: isSelected ? t.bg : '#142219',
                    color: isSelected ? t.color : '#74917B',
                  }}
                >
                  {t.label}
                </button>
              )
            })}
          </div>

          <textarea
            value={content}
            onChange={(e) => { setContent(e.target.value); persist({ content: e.target.value }) }}
            placeholder="Begin writing... your thoughts are safe here."
            className="w-full border-none bg-transparent text-sm leading-relaxed outline-none resize-none"
            style={{ color: '#F2F7F1', minHeight: 400 }}
          />

          <div className="flex items-center justify-between mt-4">
            <span
              className="text-xs font-medium"
              style={{
                color: wordCount >= 200 ? '#4ADE80' : wordCount >= 100 ? '#F0B429' : '#74917B',
              }}
            >
              {wordCount} words
              {wordCount >= 200 ? " — Great depth" : wordCount >= 100 ? " — Keep going" : ""}
            </span>
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: '1px solid #1F3326' }}>
            <p className="text-sm font-medium mb-3" style={{ color: '#F2F7F1' }}>How are you feeling right now?</p>
            <div className="flex gap-2">
              {moodEmojis.map((emoji) => {
                const isSelected = mood === emoji
                return (
                  <button
                    key={emoji}
                    onClick={() => { setMood(emoji); persist({ mood: emoji }) }}
                    className="rounded-lg px-4 py-2.5 text-xl transition-all duration-150"
                    style={{
                      border: isSelected ? '2px solid #4ADE80' : '2px solid #1F3326',
                      background: isSelected ? 'rgba(74,222,128,0.08)' : 'transparent',
                      boxShadow: isSelected ? '0 0 0 4px rgba(74,222,128,0.12)' : 'none',
                      transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                    }}
                  >
                    {emoji}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 rounded-full px-4 py-2 text-xs font-medium shadow-lg"
        style={{ background: '#0D1A12', color: '#74917B', boxShadow: '0 0 0 1px rgba(31,51,38,0.3), 0 4px 16px rgba(8,17,12,0.4)' }}
      >
        All changes saved
      </div>
    </div>
  )
}
