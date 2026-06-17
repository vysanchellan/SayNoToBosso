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

const selectClass = "rounded-xl text-sm px-3 py-2 h-9 focus:outline-none"
const selectStyle: React.CSSProperties = { backgroundColor: '#0E1A12', border: '1px solid #1F3326', color: '#B9D0BE' }

export default function UserFilterBar({ search, onSearch, status, onStatus, tier, onTier, week, onWeek, sort, onSort, total }: UserFilterBarProps) {
  const clearable = search || status !== "All" || tier !== "All" || week !== "All" || sort !== "Days in Program"

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: '#74917B' }} />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by name, ID, or facility..."
            className="w-full rounded-xl pl-9 pr-3 py-2 h-9 text-sm focus:outline-none focus:ring-2 placeholder:text-sm"
            style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326', color: '#B9D0BE', outline: 'none' }}
          />
        </div>
        <select value={status} onChange={(e) => onStatus(e.target.value)} className={selectClass} style={selectStyle}>
          <option value="All">Status: All</option>
          <option value="Active">Active</option>
          <option value="At-Risk">At-Risk</option>
          <option value="Completed">Completed</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select value={tier} onChange={(e) => onTier(e.target.value)} className={selectClass} style={selectStyle}>
          <option value="All">Tier: All</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Heavy">Heavy</option>
        </select>
        <select value={week} onChange={(e) => onWeek(e.target.value)} className={selectClass} style={selectStyle}>
          <option value="All">Week: All</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={`Week ${i + 1}`}>Week {i + 1}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => onSort(e.target.value)} className={selectClass} style={selectStyle}>
          <option value="Days in Program">Sort: Days in Program</option>
          <option value="Last Active">Last Active</option>
          <option value="Mood Score">Mood Score</option>
          <option value="Streak">Streak</option>
        </select>
        {clearable && (
          <button onClick={() => { onSearch(""); onStatus("All"); onTier("All"); onWeek("All"); onSort("Days in Program") }} className="text-xs hover:underline shrink-0" style={{ color: '#4ADE80' }}>
            Clear Filters
          </button>
        )}
      </div>
      <p className="text-xs" style={{ color: '#74917B' }}>Showing {total} users</p>
    </div>
  )
}
