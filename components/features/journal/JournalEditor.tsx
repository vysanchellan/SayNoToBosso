"use client"

import { useState, useEffect, useRef } from "react"
import { Lock, Eye, Tag, Trash2, AlertCircle } from "lucide-react"
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
  { label: "Personal", color: "var(--primary)" },
  { label: "Program", color: "var(--amber)" },
  { label: "Milestone", color: "var(--accent)" },
  { label: "Gratitude", color: "var(--sage)" },
  { label: "Difficult Day", color: "var(--destructive)" },
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
      <div className="flex items-center justify-between border-b bg-card px-6 py-3" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); persist({ date: e.target.value }) }}
            className="rounded-lg border bg-card px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            style={{ borderColor: 'hsl(var(--border))' }}
          />
          <button
            onClick={() => { setIsPrivate(!isPrivate); persist({ isPrivate: !isPrivate }) }}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              isPrivate ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
            }`}
          >
            {isPrivate ? <Lock className="size-3" /> : <Eye className="size-3" />}
            {isPrivate ? "Private" : "Shared"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${saved ? "text-foreground/60" : "text-amber"}`}>
            {saved ? "Saved" : "Saving..."}
          </span>
          {entry.id && (
            <Dialog open={showDelete} onOpenChange={setShowDelete}>
              <DialogTrigger render={<button className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all" aria-label="Delete entry" style={{ borderColor: 'hsl(var(--border))' }} />}>
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

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-6">
          {programPrompt && (
            <div className="mb-6 rounded-lg border p-4" style={{ borderColor: 'hsl(var(--accent) / 0.25)', background: 'hsl(var(--accent) / 0.06)' }}>
              <div className="flex items-start gap-3">
                <Tag className="size-4 shrink-0 mt-0.5" style={{ color: 'hsl(var(--accent))' }} />
                <p className="text-sm italic text-foreground/80">{programPrompt}</p>
              </div>
            </div>
          )}

          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); persist({ title: e.target.value }) }}
            placeholder="Entry title..."
            className="w-full border-none bg-transparent text-2xl font-semibold text-foreground placeholder:text-muted-foreground/40 focus:outline-none mb-4"
          />

          <div className="flex gap-1.5 mb-4 flex-wrap">
            {tagOptions.map((t) => {
              const isSelected = tag === t.label
              return (
                <button
                  key={t.label}
                  onClick={() => { setTag(t.label); persist({ tag: t.label }) }}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    isSelected
                      ? "text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  style={isSelected ? { background: `hsl(${t.color})` } : {}}
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
            className="w-full border-none bg-transparent text-base leading-relaxed text-foreground placeholder:text-muted-foreground/40 focus:outline-none resize-none"
            style={{ minHeight: 400 }}
          />

          <div className="flex items-center justify-between mt-4">
            <span
              className={`text-xs font-medium ${
                wordCount >= 200 ? "text-primary" : wordCount >= 100 ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {wordCount} words
              {wordCount >= 200 ? " — Great depth" : wordCount >= 100 ? " — Keep going" : ""}
            </span>
          </div>

          <div className="mt-8 border-t pt-6" style={{ borderColor: 'hsl(var(--border))' }}>
            <p className="text-sm font-medium text-foreground mb-3">How are you feeling right now?</p>
            <div className="flex gap-2">
              {moodEmojis.map((emoji) => {
                const isSelected = mood === emoji
                return (
                  <button
                    key={emoji}
                    onClick={() => { setMood(emoji); persist({ mood: emoji }) }}
                    className="rounded-lg px-4 py-2.5 text-xl transition-all duration-150"
                    style={{
                      border: isSelected ? '2px solid hsl(var(--primary))' : '2px solid hsl(var(--border))',
                      background: isSelected ? 'hsl(var(--primary) / 0.08)' : 'transparent',
                      boxShadow: isSelected ? '0 0 0 4px hsl(var(--primary) / 0.12)' : 'none',
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
    </div>
  )
}
