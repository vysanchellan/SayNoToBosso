"use client"

import { useState } from "react"
import { Search, Plus, Tag, AlertCircle, Lock } from "lucide-react"

interface Entry {
  id: string
  title: string
  preview: string
  date: string
  relativeDate: string
  tag?: string
  mood?: string
  flagged?: boolean
  isPrivate?: boolean
}

const tagColours: Record<string, { bg: string; text: string }> = {
  "Milestone": { bg: "hsl(38 75% 55% / 0.15)", text: "hsl(var(--accent))" },
  "Difficult Day": { bg: "hsl(8 65% 58% / 0.15)", text: "hsl(var(--destructive))" },
  "Gratitude": { bg: "hsl(140 40% 48% / 0.15)", text: "hsl(140 40% 65%)" },
  "Week 1": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
  "Week 2": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
  "Week 3": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
  "Week 4": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
  "Week 5": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
  "Week 6": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
  "Week 7": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
  "Week 8": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
  "Week 9": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
  "Week 10": { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))" },
}

export default function JournalSidebar({
  entries,
  activeId,
  onSelect,
  onNew,
}: {
  entries: Entry[]
  activeId: string | null
  onSelect: (id: string) => void
  onNew: () => void
}) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filters = ["All", "Program Prompts", "Personal", "Milestones", "Flagged"]

  const filtered = entries.filter((e) => {
    const matchesSearch = search === "" || e.title.toLowerCase().includes(search.toLowerCase()) || e.preview.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "All" ? true
        : filter === "Program Prompts" ? e.tag?.includes("Week")
        : filter === "Personal" ? e.tag === "Personal"
        : filter === "Milestones" ? e.tag === "Milestone"
        : filter === "Flagged" ? e.flagged
        : true
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex h-full flex-col" style={{ background: 'hsl(160 25% 9%)' }}>
      <div className="p-4 pb-3">
        <button
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white transition-colors"
          style={{ background: 'hsl(var(--primary))' }}
        >
          <Plus className="size-4" />
          New Entry
        </button>
      </div>

      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: 'hsl(var(--sidebar-foreground))' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search entries..."
            className="w-full rounded-xl py-2 pl-9 pr-3 text-sm outline-none"
            style={{ background: 'hsl(var(--sidebar-accent))', color: 'hsl(var(--sidebar-foreground))' }}
          />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => {
          const active = filter === f
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="shrink-0 rounded-lg px-3 py-1 text-xs font-medium transition-colors"
              style={{
                background: active ? 'hsl(var(--primary) / 0.25)' : 'hsl(var(--sidebar-accent))',
                color: active ? 'hsl(140 40% 65%)' : 'hsl(var(--sidebar-foreground))',
              }}
            >
              {f}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filtered.length === 0 ? (
          <p className="pt-8 text-center text-xs" style={{ color: 'hsl(var(--sidebar-foreground))' }}>No entries found</p>
        ) : (
          <div className="space-y-1">
            {filtered.map((entry) => {
              const tagColour = tagColours[entry.tag || ""]
              return (
                <button
                  key={entry.id}
                  onClick={() => onSelect(entry.id)}
                  className="flex w-full flex-col gap-1 rounded-xl px-3 py-3 text-left transition-colors"
                  style={{
                    background: activeId === entry.id ? 'hsl(var(--sidebar-accent))' : 'transparent',
                    borderLeft: activeId === entry.id ? '2px solid hsl(var(--primary))' : '2px solid transparent',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate flex-1" style={{ color: 'hsl(var(--sidebar-foreground))' }}>
                      {entry.title || "Untitled Entry"}
                    </span>
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      {entry.flagged && <AlertCircle className="size-3" style={{ color: 'hsl(var(--destructive))' }} />}
                      {entry.isPrivate && <Lock className="size-3" style={{ color: 'hsl(var(--sidebar-foreground) / 0.4)' }} />}
                    </div>
                  </div>
                  <p className="text-xs line-clamp-1" style={{ color: 'hsl(var(--sidebar-foreground) / 0.7)' }}>{entry.preview.slice(0, 80)}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px]" style={{ color: 'hsl(var(--sidebar-foreground) / 0.4)' }}>{entry.relativeDate}</span>
                    {entry.tag && tagColour && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ background: tagColour.bg, color: tagColour.text }}
                      >
                        <Tag className="size-2.5" />
                        {entry.tag}
                      </span>
                    )}
                    {entry.tag && !tagColour && (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
                        <Tag className="size-2.5" />
                        {entry.tag}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
