"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const tags = ["Milestone", "Struggling", "Tip", "Gratitude", "General"]

export default function PostComposer() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [anon, setAnon] = useState(true)
  const [tag, setTag] = useState("General")
  const [posted, setPosted] = useState(false)

  if (posted) {
    return (
      <div className="rounded-2xl border bg-green-50 p-4 text-center">
        <p className="text-sm font-medium text-green-700">Your post has been submitted for review.</p>
        <p className="text-xs text-green-600 mt-1">It will appear in the feed within 24 hours.</p>
      </div>
    )
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border-2 border-dashed p-4 text-center text-sm transition-colors hover:border-primary/50 hover:text-primary"
        style={{ borderColor: 'hsl(var(--muted-foreground) / 0.2)', color: 'hsl(var(--muted-foreground))', background: 'hsl(var(--card))' }}
      >
        Share with the community...
      </button>
    )
  }

  return (
    <div className="rounded-2xl border p-4 shadow-sm" style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind? Remember to keep it anonymous and supportive."
        className="w-full min-h-[100px] rounded-xl border border-muted-foreground/20 bg-card p-3 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
        maxLength={500}
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1 mb-3">
        <span>{text.length}/500</span>
        {text.length < 20 && <span className="text-amber-600">Minimum 20 characters</span>}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              tag === t ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={anon}
            onChange={(e) => setAnon(e.target.checked)}
            className="rounded border-muted-foreground/30 text-primary focus:ring-primary/30"
          />
          <span className="text-xs text-muted-foreground">Post anonymously</span>
        </label>
        <Button
          onClick={() => setPosted(true)}
          disabled={text.trim().length < 20}
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
        >
          Post to Community
        </Button>
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground/60">
        Posts are reviewed within 24 hours before appearing publicly.
      </p>
    </div>
  )
}
