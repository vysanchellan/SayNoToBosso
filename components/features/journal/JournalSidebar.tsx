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
  "Milestone": { bg: "rgba(240,180,41,0.15)", text: "#F0B429" },
  "Difficult Day": { bg: "rgba(248,113,113,0.15)", text: "#F87171" },
  "Gratitude": { bg: "rgba(74,222,128,0.15)", text: "#4ADE80" },
  "Week 1": { bg: "#142219", text: "#74917B" },
  "Week 2": { bg: "#142219", text: "#74917B" },
  "Week 3": { bg: "#142219", text: "#74917B" },
  "Week 4": { bg: "#142219", text: "#74917B" },
  "Week 5": { bg: "#142219", text: "#74917B" },
  "Week 6": { bg: "#142219", text: "#74917B" },
  "Week 7": { bg: "#142219", text: "#74917B" },
  "Week 8": { bg: "#142219", text: "#74917B" },
  "Week 9": { bg: "#142219", text: "#74917B" },
  "Week 10": { bg: "#142219", text: "#74917B" },
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
    <div className="flex h-full flex-col" style={{ background: '#0D1A12' }}>
      <div className="p-4 pb-3">
        <button
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white transition-colors"
          style={{ background: '#4ADE80' }}
        >
          <Plus className="size-4" />
          New Entry
        </button>
      </div>

      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: '#B9D0BE' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search entries..."
            className="w-full rounded-xl py-2 pl-9 pr-3 text-sm outline-none"
            style={{ background: '#142219', color: '#B9D0BE' }}
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
                background: active ? 'rgba(74,222,128,0.25)' : '#142219',
                color: active ? '#4ADE80' : '#B9D0BE',
              }}
            >
              {f}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filtered.length === 0 ? (
          <p className="pt-8 text-center text-xs" style={{ color: '#B9D0BE' }}>No entries found</p>
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
                    background: activeId === entry.id ? '#142219' : 'transparent',
                    borderLeft: activeId === entry.id ? '2px solid #4ADE80' : '2px solid transparent',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate flex-1" style={{ color: '#B9D0BE' }}>
                      {entry.title || "Untitled Entry"}
                    </span>
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      {entry.flagged && <AlertCircle className="size-3" style={{ color: '#F87171' }} />}
                      {entry.isPrivate && <Lock className="size-3" style={{ color: 'rgba(185,208,190,0.4)' }} />}
                    </div>
                  </div>
                  <p className="text-xs line-clamp-1" style={{ color: 'rgba(185,208,190,0.7)' }}>{entry.preview.slice(0, 80)}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px]" style={{ color: 'rgba(185,208,190,0.4)' }}>{entry.relativeDate}</span>
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
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: '#142219', color: '#74917B' }}>
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
