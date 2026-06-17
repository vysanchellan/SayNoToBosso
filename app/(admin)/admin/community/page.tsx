"use client"

import { useState } from "react"
import { Check, X, Flag, Pin, RotateCcw, Download, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

interface Post {
  id: string
  user: string
  day: number
  content: string
  time: string
  status: "pending" | "approved" | "removed"
  approvedBy?: string
  approvedAt?: string
  removedReason?: string
  pinned?: boolean
}

const mockPosts: Post[] = [
  { id: "P001", user: "User #A14", day: 14, content: "The vivid dreams are finally getting less intense. Week 2 breathing exercises helped so much.", time: "2 hours ago", status: "pending" },
  { id: "P002", user: "User #B07", day: 7, content: "Today was really hard. Cravings at 3pm almost got me. Used the grounding tool and it actually worked.", time: "5 hours ago", status: "pending" },
  { id: "P003", user: "User #C22", day: 30, content: "ONE MONTH. I genuinely didn't think I could do this.", time: "1 day ago", status: "pending" },
  { id: "P004", user: "User #D33", day: 3, content: "Just starting. Terrified. But I'm here.", time: "2 days ago", status: "pending" },
  { id: "P005", user: "User #E05", day: 45, content: "For anyone in week 1 reading this — it gets so much easier. I promise. Day 45 here.", time: "2 days ago", status: "pending" },
  { id: "P006", user: "User #F12", day: 21, content: "The journal prompts feel cheesy at first but they sneak up on you.", time: "3 days ago", status: "approved", approvedBy: "Dr. Naledi Sithole", approvedAt: "2 days ago" },
  { id: "P007", user: "User #G08", day: 60, content: "Two months clean. My family noticed before I did.", time: "4 days ago", status: "approved", approvedBy: "Dr. Naledi Sithole", approvedAt: "3 days ago", pinned: true },
  { id: "P008", user: "User #H09", day: 1, content: "Day 1. This is hard.", time: "1 week ago", status: "approved", approvedBy: "Dr. Naledi Sithole", approvedAt: "6 days ago" },
  { id: "P009", user: "User #I10", day: 14, content: "Mentioned specific medication dosage in post.", time: "2 days ago", status: "removed", removedReason: "Medical advice — share experience only" },
  { id: "P010", user: "User #J11", day: 8, content: "Shared full name and clinic location.", time: "5 days ago", status: "removed", removedReason: "Identifying information" },
]

const logEntries = Array.from({ length: 10 }, (_, i) => ({
  postId: `P00${(i % 9) + 1}`,
  action: ["Approved", "Removed", "Flagged", "Approved", "Removed", "Approved", "Flagged", "Approved", "Approved", "Removed"][i],
  staff: ["Dr. Sithole", "Dr. Sithole", "Dr. Sithole", "Dr. Naidoo", "Dr. Sithole", "Dr. Naidoo", "Dr. Sithole", "Dr. Sithole", "Dr. Naidoo", "Dr. Sithole"][i],
  reason: ["—", "Identifying information", "Medical advice", "—", "External contact", "—", "Crisis language", "—", "—", "Duplicate"][i],
  timestamp: [`${i + 1}h ago`, `${i * 3}h ago`, `${i * 5}h ago`, `${i * 2}d ago`, `${i + 2}d ago`, `${i + 3}d ago`, `${i * 4}h ago`, `${i + 5}d ago`, `${i * 2 + 1}d ago`, `${i + 6}d ago`][i],
}))

const statusSummary = [
  { key: "pending", label: "Pending", bg: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
  { key: "approved", label: "Approved", bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  { key: "removed", label: "Removed", bg: "bg-destructive/10 text-destructive border border-destructive/20" },
]

export default function AdminCommunityPage() {
  const [tab, setTab] = useState("pending")
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [removalReason, setRemovalReason] = useState("")

  const pendingCount = posts.filter((p) => p.status === "pending").length
  const approvedCount = posts.filter((p) => p.status === "approved").length
  const removedCount = posts.filter((p) => p.status === "removed").length

  const handleApprove = (id: string) => {
    setPosts((prev) => prev.map((p) =>
      p.id === id ? { ...p, status: "approved" as const, approvedBy: "Dr. Naledi Sithole", approvedAt: "Just now" } : p
    ))
    toast.success("Post approved and published")
  }

  const handleRemove = (id: string) => {
    const reason = removalReason || "Community guidelines violation"
    setPosts((prev) => prev.map((p) =>
      p.id === id ? { ...p, status: "removed" as const, removedReason: reason } : p
    ))
    setRemovalReason("")
  }

  const handleRestore = (id: string) => {
    setPosts((prev) => prev.map((p) =>
      p.id === id ? { ...p, status: "approved" as const, approvedBy: "Dr. Naledi Sithole", approvedAt: "Just now" } : p
    ))
  }

  const handlePin = (id: string) => {
    setPosts((prev) => prev.map((p) =>
      p.id === id ? { ...p, pinned: !p.pinned } : p
    ))
  }

  const displayPosts = posts.filter((p) => {
    if (tab === "pending") return p.status === "pending"
    if (tab === "approved") return p.status === "approved"
    if (tab === "removed") return p.status === "removed"
    return true
  })

  return (
    <div id="main-content" className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Community Moderation</h1>
        <div className="flex items-center gap-3 mt-2">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${statusSummary[0].bg}`}>{pendingCount} Pending</span>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${statusSummary[1].bg}`}>{approvedCount} Approved</span>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${statusSummary[2].bg}`}>{removedCount} Removed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2">
            {["pending", "approved", "removed"].map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-xl px-4 py-1.5 text-sm font-medium transition-colors ${
                  tab === k
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {k === "pending" ? `Pending (${pendingCount})` : k === "approved" ? `Approved (${approvedCount})` : `Removed (${removedCount})`}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {displayPosts.map((post) => (
              <div key={post.id} className={`rounded-2xl bg-card p-4 mb-3 ${post.pinned ? "ring-1 ring-accent" : ""}`} style={post.pinned ? {} : { boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {post.user.split("#")[1] || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono bg-muted rounded px-1.5 py-0.5 text-muted-foreground">{post.user}</span>
                      <span className="inline-flex rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">Day {post.day}</span>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                      {post.pinned && <Pin className="size-3 text-accent" />}
                    </div>
                    <p className="text-sm text-foreground mt-2 leading-relaxed">{post.content}</p>

                    {post.status === "removed" && post.removedReason && (
                      <p className="text-xs text-destructive mt-2">Removed: {post.removedReason}</p>
                    )}

                    {post.status === "approved" && post.approvedBy && (
                      <p className="text-[10px] mt-2" style={{ color: 'hsl(152 55% 65%)' }}>Approved by {post.approvedBy} &middot; {post.approvedAt}</p>
                    )}

                    {tab === "pending" && (
                      <>
                        <div className="flex items-center gap-2 mt-3">
                          <button onClick={() => handleApprove(post.id)} className="flex items-center gap-1 rounded-xl bg-emerald-600 text-white px-3 h-8 text-xs font-semibold hover:bg-emerald-500 transition-colors">
                            <Check className="size-3.5" /> Approve
                          </button>
                          <button onClick={() => handleRemove(post.id)} className="flex items-center gap-1 rounded-xl bg-destructive text-destructive-foreground px-3 h-8 text-xs font-semibold hover:bg-destructive/90 transition-colors">
                            <X className="size-3.5" /> Remove
                          </button>
                          <button className="flex items-center gap-1 rounded-xl bg-amber-600 text-white px-3 h-8 text-xs font-semibold hover:bg-amber-500 transition-colors">
                            <Flag className="size-3.5" /> Flag for Clinical Review
                          </button>
                        </div>
                        <div className="mt-2">
                          <input
                            value={removalReason}
                            onChange={(e) => setRemovalReason(e.target.value)}
                            placeholder="Remove reason (optional)..."
                            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                          />
                        </div>
                      </>
                    )}

                    {tab === "approved" && (
                      <div className="flex items-center gap-2 mt-3">
                        <button onClick={() => handleRemove(post.id)} className="flex items-center gap-1 rounded-xl border border-rose-700 px-3 h-8 text-xs font-semibold text-rose-400 hover:bg-rose-950/50 transition-colors">
                          <X className="size-3.5" /> Remove
                        </button>
                        <button onClick={() => handlePin(post.id)} className="flex items-center gap-1 rounded-xl border border-accent/30 px-3 h-8 text-xs font-semibold text-accent hover:bg-accent/5 transition-colors">
                          <Pin className="size-3.5" /> {post.pinned ? "Unpin" : "Pin to Top"}
                        </button>
                      </div>
                    )}

                    {tab === "removed" && (
                      <button onClick={() => handleRestore(post.id)} className="flex items-center gap-1 rounded-xl border border-green-700 px-3 h-8 text-xs font-semibold text-green-400 hover:bg-green-950/50 transition-colors mt-3">
                        <RotateCcw className="size-3.5" /> Restore
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-card p-4" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
            <h3 className="eyebrow mb-3">Content Guidelines</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Approve when:</p>
                  <div className="flex items-start gap-1.5 text-xs" style={{ color: 'hsl(152 55% 65%)' }}>
                    <CheckCircle className="size-3.5 mt-0.5 shrink-0" />
                    <span>Supportive, on-topic, respectful, follows guidelines</span>
                  </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Remove when:</p>
                <div className="flex items-start gap-1.5 text-xs text-destructive">
                  <XCircle className="size-3.5 mt-0.5 shrink-0" />
                  <span>Identifying info, medical advice, external contacts, crisis content without resources</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Escalate when:</p>
                <div className="flex items-start gap-1.5 text-xs" style={{ color: 'hsl(38 75% 65%)' }}>
                  <AlertTriangle className="size-3.5 mt-0.5 shrink-0" />
                  <span>Self-harm language, suicidal ideation, severe distress</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <a href="#" className="text-xs text-primary hover:underline">Report to SADAG</a>
            </div>
          </div>
        </aside>
      </div>

      <div className="rounded-2xl bg-card p-4" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="eyebrow">Moderation Log</h3>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <Download className="size-3.5" /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-2 font-medium text-muted-foreground">Post ID</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Staff</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Reason</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logEntries.map((entry, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="p-2 font-medium text-foreground">{entry.postId}</td>
                  <td className="p-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium ${
                      entry.action === "Approved" ? "bg-emerald-500/10 text-emerald-400" : entry.action === "Removed" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-500"
                    }`}>{entry.action}</span>
                  </td>
                  <td className="p-2 text-muted-foreground">{entry.staff}</td>
                  <td className="p-2 text-muted-foreground">{entry.reason}</td>
                  <td className="p-2 text-muted-foreground">{entry.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
