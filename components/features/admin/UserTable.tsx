"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import BulkActionsBar from "./BulkActionsBar"
import UserProfileDrawer from "./UserProfileDrawer"
import UserFilterBar from "./UserFilterBar"

interface UserRow {
  id: string
  name: string
  tier: string
  day: number
  week: number
  lastActive: string
  mood: number
  streak: number
  status: string
}

const mockUsers: UserRow[] = [
  { id: "U001", name: "J. Mokoena", tier: "Moderate", day: 22, week: 4, lastActive: "2 hrs ago", mood: 7.2, streak: 22, status: "Active" },
  { id: "U002", name: "R. van der Berg", tier: "Heavy", day: 8, week: 2, lastActive: "1 hr ago", mood: 5.1, streak: 6, status: "Active" },
  { id: "U003", name: "T. Nkosi", tier: "Mild", day: 35, week: 6, lastActive: "30 min ago", mood: 8.4, streak: 35, status: "Active" },
  { id: "U004", name: "A. Patel", tier: "Moderate", day: 6, week: 1, lastActive: "4 days ago", mood: 3.2, streak: 0, status: "At-Risk" },
  { id: "U005", name: "S. Dlamini", tier: "Heavy", day: 18, week: 3, lastActive: "1 day ago", mood: 4.8, streak: 3, status: "At-Risk" },
  { id: "U006", name: "M. Joubert", tier: "Moderate", day: 70, week: 10, lastActive: "3 hrs ago", mood: 9.1, streak: 70, status: "Completed" },
  { id: "U007", name: "K. Sithole", tier: "Mild", day: 14, week: 2, lastActive: "5 hrs ago", mood: 6.9, streak: 14, status: "Active" },
  { id: "U008", name: "P. Steenkamp", tier: "Heavy", day: 44, week: 7, lastActive: "2 days ago", mood: 5.5, streak: 2, status: "At-Risk" },
  { id: "U009", name: "N. Molefe", tier: "Moderate", day: 28, week: 5, lastActive: "45 min ago", mood: 7.8, streak: 28, status: "Active" },
  { id: "U010", name: "L. Botha", tier: "Mild", day: 42, week: 7, lastActive: "1 hr ago", mood: 8.9, streak: 42, status: "Active" },
  { id: "U011", name: "D. Pretorius", tier: "Heavy", day: 12, week: 2, lastActive: "6 hrs ago", mood: 4.2, streak: 5, status: "Active" },
  { id: "U012", name: "Z. Khumalo", tier: "Moderate", day: 50, week: 8, lastActive: "8 hrs ago", mood: 6.5, streak: 50, status: "Active" },
  { id: "U013", name: "E. Venter", tier: "Mild", day: 3, week: 1, lastActive: "3 days ago", mood: 5.8, streak: 0, status: "At-Risk" },
  { id: "U014", name: "B. Ngwenya", tier: "Moderate", day: 60, week: 9, lastActive: "2 hrs ago", mood: 8.1, streak: 60, status: "Completed" },
  { id: "U015", name: "C. de Villiers", tier: "Heavy", day: 32, week: 5, lastActive: "1 day ago", mood: 4.9, streak: 32, status: "Active" },
]

const tierBadgeClass: Record<string, string> = {
  Mild: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Moderate: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Heavy: "bg-destructive/10 text-destructive border border-destructive/20",
}

const statusBadgeClass: Record<string, string> = {
  Active: "bg-primary/10 text-primary border border-primary/20",
  Completed: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "At-Risk": "bg-destructive/10 text-destructive border border-destructive/20",
}

function getMoodClass(mood: number) {
  if (mood >= 8) return "font-semibold"
  if (mood >= 6) return "font-semibold"
  return "font-semibold"
}

export default function UserTable() {
  const [selected, setSelected] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<string>("day")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerUser, setDrawerUser] = useState<UserRow | null>(null)

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [tier, setTier] = useState("All")
  const [week, setWeek] = useState("All")
  const [sort, setSort] = useState("Days in Program")

  const perPage = 10

  const filtered = mockUsers
    .filter((u) => {
      if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.id.toLowerCase().includes(search.toLowerCase())) return false
      if (status !== "All" && u.status !== status) return false
      if (tier !== "All" && u.tier !== tier) return false
      if (week !== "All") {
        const w = Number(week.split(" ")[1])
        if (u.week !== w) return false
      }
      return true
    })
    .sort((a, b) => {
      let cmp = 0
      if (sort === "Days in Program") cmp = a.day - b.day
      else if (sort === "Last Active") cmp = a.lastActive.localeCompare(b.lastActive)
      else if (sort === "Mood Score") cmp = a.mood - b.mood
      else if (sort === "Streak") cmp = a.streak - b.streak
      return sortDir === "asc" ? cmp : -cmp
    })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pageUsers = filtered.slice(page * perPage, (page + 1) * perPage)

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const toggleSelect = (id: string) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])
  }

  return (
    <div className="space-y-4">
      <UserFilterBar
        search={search} onSearch={setSearch}
        status={status} onStatus={setStatus}
        tier={tier} onTier={setTier}
        week={week} onWeek={setWeek}
        sort={sort} onSort={setSort}
        total={filtered.length}
      />

      <BulkActionsBar count={selected.length} onClear={() => setSelected([])} />

      <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4), 0 1px 3px hsl(160 28% 4% / 0.1)' }}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.length === pageUsers.length && pageUsers.length > 0}
                  onChange={() => {
                    if (selected.length === pageUsers.length) setSelected([])
                    else setSelected(pageUsers.map((u) => u.id))
                  }}
                  className="rounded border-muted-foreground/30"
                />
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer" onClick={() => toggleSort("name")}>
                User{sortKey === "name" ? (sortDir === "asc" ? <ArrowUp className="size-3 inline ml-1" /> : <ArrowDown className="size-3 inline ml-1" />) : null}
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tier</TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer" onClick={() => toggleSort("day")}>
                Day{sortKey === "day" ? (sortDir === "asc" ? <ArrowUp className="size-3 inline ml-1" /> : <ArrowDown className="size-3 inline ml-1" />) : null}
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Week</TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Last Active</TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer" onClick={() => toggleSort("mood")}>
                Mood{sortKey === "mood" ? (sortDir === "asc" ? <ArrowUp className="size-3 inline ml-1" /> : <ArrowDown className="size-3 inline ml-1" />) : null}
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer" onClick={() => toggleSort("streak")}>
                Streak{sortKey === "streak" ? (sortDir === "asc" ? <ArrowUp className="size-3 inline ml-1" /> : <ArrowDown className="size-3 inline ml-1" />) : null}
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
              <TableHead className="w-12 px-4 py-3" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageUsers.map((user) => (
              <TableRow
                key={user.id}
                className={`bg-card hover:bg-muted/40 transition-colors border-b border-border last:border-0 cursor-pointer ${
                  user.status === "At-Risk" ? "bg-destructive/5 hover:bg-destructive/10 border-l-4 border-l-destructive" : ""
                } ${user.status === "Completed" ? "opacity-70" : ""}`}
                onClick={() => { setDrawerUser(user); setDrawerOpen(true) }}
              >
                <TableCell className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                    className="rounded border-muted-foreground/30"
                  />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                      {user.name.split(" ").map((s) => s[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${tierBadgeClass[user.tier] || "bg-muted text-muted-foreground"}`}>
                    {user.tier}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground font-medium">{user.day}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">Week {user.week}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{user.lastActive}</TableCell>
                <TableCell className="px-4 py-3">
                  <span className={getMoodClass(user.mood)} style={{ color: user.mood >= 8 ? 'hsl(152 55% 65%)' : user.mood >= 6 ? 'hsl(38 75% 65%)' : 'hsl(8 65% 68%)' }}>{user.mood}</span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className="text-sm font-medium text-foreground">
                    🔥 {user.streak}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClass[user.status] || "bg-muted text-muted-foreground"}`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <button className="size-8 rounded-lg flex items-center justify-center bg-transparent hover:bg-muted transition-colors" aria-label="Actions">
                        <MoreHorizontal className="size-4 text-muted-foreground" />
                      </button>
                    } />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => { setDrawerUser(user); setDrawerOpen(true) }}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Check-in</DropdownMenuItem>
                      <DropdownMenuItem>Send Alert</DropdownMenuItem>
                      <DropdownMenuItem style={{ color: 'hsl(8 65% 68%)' }}>Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Page {page + 1} of {totalPages} &middot; {filtered.length} results</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="size-8 rounded-lg border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`size-8 rounded-lg text-xs font-medium transition-colors ${
                  page === i ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="size-8 rounded-lg border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {drawerUser && (
        <UserProfileDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          user={drawerUser}
        />
      )}
    </div>
  )
}
