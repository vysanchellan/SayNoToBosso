"use client"

import { Search } from "lucide-react"

interface UserFilterBarProps {
  search: string
  onSearch: (v: string) => void
  status: string
  onStatus: (v: string) => void
  tier: string
  onTier: (v: string) => void
  week: string
  onWeek: (v: string) => void
  sort: string
  onSort: (v: string) => void
  total: number
}

const selectClass = "rounded-xl border border-border bg-card text-sm px-3 py-2 h-9 focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"

export default function UserFilterBar({ search, onSearch, status, onStatus, tier, onTier, week, onWeek, sort, onSort, total }: UserFilterBarProps) {
  const clearable = search || status !== "All" || tier !== "All" || week !== "All" || sort !== "Days in Program"

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by name, ID, or facility..."
            className="w-full rounded-xl border border-border bg-card pl-9 pr-3 py-2 h-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select value={status} onChange={(e) => onStatus(e.target.value)} className={selectClass}>
          <option value="All">Status: All</option>
          <option value="Active">Active</option>
          <option value="At-Risk">At-Risk</option>
          <option value="Completed">Completed</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select value={tier} onChange={(e) => onTier(e.target.value)} className={selectClass}>
          <option value="All">Tier: All</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Heavy">Heavy</option>
        </select>
        <select value={week} onChange={(e) => onWeek(e.target.value)} className={selectClass}>
          <option value="All">Week: All</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={`Week ${i + 1}`}>Week {i + 1}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => onSort(e.target.value)} className={selectClass}>
          <option value="Days in Program">Sort: Days in Program</option>
          <option value="Last Active">Last Active</option>
          <option value="Mood Score">Mood Score</option>
          <option value="Streak">Streak</option>
        </select>
        {clearable && (
          <button onClick={() => { onSearch(""); onStatus("All"); onTier("All"); onWeek("All"); onSort("Days in Program") }} className="text-xs text-primary hover:underline shrink-0">
            Clear Filters
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Showing {total} users</p>
    </div>
  )
}
