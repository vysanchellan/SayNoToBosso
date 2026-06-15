"use client"

import { useState } from "react"
import { Check, X, Flag, Pin, RotateCcw, Download } from "lucide-react"
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
        <h1 className="text-xl font-bold">Community Moderation</h1>
        <div className="flex items-center gap-3 mt-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-0.5 text-xs font-medium text-amber-700">{pendingCount} Pending Review</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-700">{approvedCount} Approved</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-0.5 text-xs font-medium text-rose-700">{removedCount} Removed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-1 rounded-2xl border bg-card p-1 w-fit">
            {[
              { key: "pending", label: `Pending (${pendingCount})` },
              { key: "approved", label: `Approved (${approvedCount})` },
              { key: "removed", label: `Removed (${removedCount})` },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-colors ${
                  tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {displayPosts.map((post) => (
              <div key={post.id} className={`rounded-2xl border bg-card p-4 ${post.pinned ? "ring-1 ring-accent" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {post.user.split("#")[1] || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">{post.user}</span>
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">Day {post.day}</span>
                      <span className="text-[10px] text-muted-foreground">{post.time}</span>
                      {post.pinned && <Pin className="size-3 text-accent" />}
                    </div>
                    <p className="text-sm text-foreground/80 mt-1">{post.content}</p>

                    {post.status === "removed" && post.removedReason && (
                      <p className="text-xs text-rose-600 mt-2">Removed: {post.removedReason}</p>
                    )}

                    {post.status === "approved" && post.approvedBy && (
                      <p className="text-[10px] text-green-600 mt-2">Approved by {post.approvedBy} · {post.approvedAt}</p>
                    )}

                    {tab === "pending" && (
                      <>
                        <div className="flex items-center gap-2 mt-3">
                          <button onClick={() => handleApprove(post.id)} className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 transition-colors">
                            <Check className="size-3.5" /> Approve
                          </button>
                          <button onClick={() => handleRemove(post.id)} className="flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700 transition-colors">
                            <X className="size-3.5" /> Remove
                          </button>
                          <button className="flex items-center gap-1 rounded-full bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700 transition-colors">
                            <Flag className="size-3.5" /> Flag for Clinical Review
                          </button>
                        </div>
                        <div className="mt-2">
                          <input
                            value={removalReason}
                            onChange={(e) => setRemovalReason(e.target.value)}
                            placeholder="Remove reason (optional)..."
                            className="w-full rounded-lg border border-muted-foreground/20 bg-card px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </div>
                      </>
                    )}

                    {tab === "approved" && (
                      <div className="flex items-center gap-2 mt-3">
                        <button onClick={() => handleRemove(post.id)} className="flex items-center gap-1 rounded-full border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors">
                          <X className="size-3.5" /> Remove
                        </button>
                        <button onClick={() => handlePin(post.id)} className="flex items-center gap-1 rounded-full border border-accent/30 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/5 transition-colors">
                          <Pin className="size-3.5" /> {post.pinned ? "Unpin" : "Pin to Top"}
                        </button>
                      </div>
                    )}

                    {tab === "removed" && (
                      <button onClick={() => handleRestore(post.id)} className="flex items-center gap-1 rounded-full border border-green-300 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 transition-colors mt-3">
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
          <div className="rounded-2xl border bg-card p-4">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2">CONTENT GUIDELINES</h3>
            <div className="space-y-2">
              {[
                { label: "✓ Approve when:", desc: "Supportive, on-topic, respectful, follows guidelines" },
                { label: "✗ Remove when:", desc: "Identifying info, medical advice, external contacts, crisis content without resources" },
                { label: "🚩 Escalate when:", desc: "Self-harm language, suicidal ideation, severe distress" },
              ].map((g, i) => (
                <div key={i} className="text-xs">
                  <p className="font-medium text-foreground">{g.label}</p>
                  <p className="text-muted-foreground">{g.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t">
              <a href="#" className="text-xs text-primary hover:underline">Report to SADAG</a>
            </div>
          </div>
        </aside>
      </div>

      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground">MODERATION LOG</h3>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <Download className="size-3.5" /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-2 font-medium text-muted-foreground">Post ID</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Staff</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Reason</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logEntries.map((entry, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="p-2 font-medium">{entry.postId}</td>
                  <td className="p-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium ${
                      entry.action === "Approved" ? "bg-green-100 text-green-700" : entry.action === "Removed" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
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
