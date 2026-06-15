"use client"

import { useState } from "react"
import { ThumbsUp, Heart, Dumbbell, MessageCircle, ChevronDown, ChevronUp } from "lucide-react"

interface Post {
  id: number
  initials: string
  name: string
  day: number
  content: string
  timeAgo: string
  reactions: { helpful: number; relate: number; strength: number }
  replies: number
  category?: string
}

const mockPosts: Post[] = [
  {
    id: 1, initials: "JM", name: "J***n M.", day: 14, category: "milestone",
    content: "The vivid dreams are finally getting less intense. Week 2 breathing exercises helped so much.",
    timeAgo: "2 hours ago", reactions: { helpful: 5, relate: 8, strength: 3 }, replies: 2,
  },
  {
    id: 2, initials: "SK", name: "S***h K.", day: 7, category: "struggling",
    content: "Today was really hard. Cravings at 3pm almost got me. Used the grounding tool and it actually worked.",
    timeAgo: "5 hours ago", reactions: { helpful: 12, relate: 15, strength: 7 }, replies: 4,
  },
  {
    id: 3, initials: "MT", name: "M***k T.", day: 30, category: "milestone",
    content: "ONE MONTH. I genuinely didn't think I could do this. The nutrition tips in week 3 changed my relationship with food entirely.",
    timeAgo: "1 day ago", reactions: { helpful: 18, relate: 10, strength: 20 }, replies: 6,
  },
  {
    id: 4, initials: "LN", name: "L***e N.", day: 21, category: "gratitude",
    content: "The sleep tracker showed me I'm finally getting REM sleep again. My counsellor explained what that means and I cried.",
    timeAgo: "1 day ago", reactions: { helpful: 7, relate: 12, strength: 9 }, replies: 3,
  },
  {
    id: 5, initials: "TD", name: "T***o D.", day: 3, category: "general",
    content: "Just starting. Terrified. But I'm here.",
    timeAgo: "2 days ago", reactions: { helpful: 22, relate: 18, strength: 25 }, replies: 8,
  },
  {
    id: 6, initials: "RM", name: "R***l M.", day: 45, category: "tip",
    content: "For anyone in week 1 reading this — it gets so much easier. I promise. Day 45 here.",
    timeAgo: "2 days ago", reactions: { helpful: 14, relate: 9, strength: 11 }, replies: 5,
  },
  {
    id: 7, initials: "CB", name: "C***l B.", day: 14, category: "tip",
    content: "The journal prompts feel cheesy at first but they sneak up on you. Wrote for 40 minutes last night without realising.",
    timeAgo: "3 days ago", reactions: { helpful: 6, relate: 11, strength: 4 }, replies: 2,
  },
  {
    id: 8, initials: "DP", name: "D***n P.", day: 60, category: "milestone",
    content: "Just got my 60-day badge. Two months clean. My family noticed before I did.",
    timeAgo: "4 days ago", reactions: { helpful: 25, relate: 13, strength: 30 }, replies: 7,
  },
]

const colorMap = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500", "bg-teal-500", "bg-pink-500", "bg-indigo-500"]

function getColor(initials: string) {
  let idx = 0
  for (let i = 0; i < initials.length; i++) idx += initials.charCodeAt(i)
  return colorMap[idx % colorMap.length]
}

const sortTabs = ["Latest", "Most Helpful", "Milestones"]
const categoryTabs = ["All", "Milestone", "Struggling", "Tip", "Gratitude", "General"]

export default function PostFeed() {
  const [sortFilter, setSortFilter] = useState("Latest")
  const [categoryFilter, setCategoryFilter] = useState("All")

  let filtered = [...mockPosts]

  if (categoryFilter !== "All") {
    filtered = filtered.filter((p) => p.category === categoryFilter.toLowerCase())
  }

  if (sortFilter === "Most Helpful") {
    filtered.sort((a, b) => (b.reactions.helpful + b.reactions.relate + b.reactions.strength) - (a.reactions.helpful + a.reactions.relate + a.reactions.strength))
  } else if (sortFilter === "Milestones") {
    filtered = filtered.filter((p) => p.category === "milestone")
  }

  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categoryTabs.map((f) => (
          <button
            key={f}
            onClick={() => setCategoryFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              categoryFilter === f
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={categoryFilter === f ? { background: 'hsl(var(--sage-light))', color: 'hsl(var(--forest))' } : {}}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {sortTabs.map((f) => (
          <button
            key={f}
            onClick={() => setSortFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              sortFilter === f
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={sortFilter === f ? { background: 'hsl(var(--sage-light))', color: 'hsl(var(--forest))' } : {}}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.map((post) => (
        <div key={post.id} className="rounded-2xl border bg-card p-4 shadow-sm" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="flex items-start gap-3">
            <div className={`size-9 shrink-0 rounded-full ${getColor(post.initials)} flex items-center justify-center text-xs font-bold text-white`}>
              {post.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-foreground">{post.name}</span>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: 'hsl(var(--accent) / 0.1)', color: 'hsl(var(--accent))' }}>
                  Day {post.day}
                </span>
                <span className="text-[10px] text-muted-foreground">{post.timeAgo}</span>
              </div>
              <p className={`text-sm text-foreground/80 mt-1 ${expanded === post.id ? "" : "line-clamp-3"}`}>
                {post.content}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="size-3.5" /> {post.reactions.helpful}
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="size-3.5" /> {post.reactions.relate}
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Dumbbell className="size-3.5" /> {post.reactions.strength}
                </button>
                <button
                  onClick={() => setExpanded(expanded === post.id ? null : post.id)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors ml-auto"
                >
                  <MessageCircle className="size-3.5" /> {post.replies}
                  {expanded === post.id ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                </button>
              </div>

              {expanded === post.id && (
                <div className="mt-3 border-t pt-3 space-y-2" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className="size-6 shrink-0 rounded-full bg-muted flex items-center justify-center text-[9px] font-medium">
                      AN
                    </div>
                    <div>
                      <p className="font-medium text-foreground/70">A*** N.</p>
                      <p>Thank you for sharing this. Really helpful to read.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className="size-6 shrink-0 rounded-full bg-muted flex items-center justify-center text-[9px] font-medium">
                      CW
                    </div>
                    <div>
                      <p className="font-medium text-foreground/70">C*** W.</p>
                      <p>I had the same experience! You&apos;re not alone.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
