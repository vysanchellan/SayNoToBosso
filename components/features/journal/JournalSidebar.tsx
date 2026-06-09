"use client"

import { useState } from "react"
import { Search, Plus, Lock, Tag } from "lucide-react"

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
    <div className="flex h-full flex-col">
      <div className="p-4">
        <button
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" />
          New Entry
        </button>
      </div>

      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search entries..."
            className="w-full rounded-xl border border-muted-foreground/20 bg-white py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filtered.length === 0 ? (
          <p className="pt-8 text-center text-xs text-muted-foreground">No entries found</p>
        ) : (
          <div className="space-y-1">
            {filtered.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSelect(entry.id)}
                className={`flex w-full flex-col gap-1 rounded-xl px-3 py-3 text-left transition-colors ${
                  activeId === entry.id ? "border-l-3 border-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground truncate flex-1">
                    {entry.title || "Untitled Entry"}
                  </span>
                  {entry.isPrivate && <Lock className="size-3 text-muted-foreground/60 shrink-0 ml-1" />}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{entry.preview.slice(0, 80)}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground/60">{entry.relativeDate}</span>
                  {entry.tag && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                      <Tag className="size-2.5" />
                      {entry.tag}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
