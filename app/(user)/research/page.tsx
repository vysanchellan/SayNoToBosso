"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Search, BookOpen, ArrowRight } from "lucide-react"
import ArticleCard from "@/components/features/research/ArticleCard"
import ArticleReader from "@/components/features/research/ArticleReader"
import FAQAccordion from "@/components/features/research/FAQAccordion"

const allArticles = [
  { id: "a1", category: "Sleep", title: "What Cannabis Does to Your Sleep Architecture", summary: "Learn how THC disrupts REM and deep sleep stages, and what happens when you quit.", readTime: "8 min", author: "Dr. Sarah Nkosi", date: "May 2026" },
  { id: "a2", category: "Science", title: "The Endocannabinoid System: Why Quitting Is Hard and Recovery Is Real", summary: "Understanding the biological system that makes cannabis dependency real — and recovery possible.", readTime: "10 min", author: "Dr. Thabo Molefe", date: "May 2026" },
  { id: "a3", category: "Cannabis & SA", title: "Cannabis Dependency in South Africa: The Numbers You Need to Know", summary: "SA-specific data on cannabis use rates, dependency prevalence, and treatment access.", readTime: "6 min", author: "CannaClear Research", date: "April 2026" },
  { id: "a4", category: "Nutrition", title: "Nutrition for a Recovering Brain: The Top 10 Foods", summary: "What to eat to support neurotransmitter repair, reduce cravings, and stabilise mood.", readTime: "7 min", author: "Lindiwe Mokoena, RD", date: "May 2026" },
  { id: "a5", category: "Mental Health", title: "Anxiety After Cannabis: What's Happening in Your Brain", summary: "The surprising truth about why quitting can make you more anxious — and how it gets better.", readTime: "9 min", author: "Dr. Thabo Molefe", date: "May 2026" },
  { id: "a6", category: "Science", title: "Exercise as Medicine: How Movement Speeds Cannabis Recovery", summary: "Physical activity boosts natural endocannabinoids and dopamine — directly reducing cravings.", readTime: "5 min", author: "CannaClear Clinical Team", date: "May 2026" },
  { id: "a7", category: "Nutrition", title: "The Role of Hydration in Detoxification", summary: "Why water is your most important recovery tool and how to stay properly hydrated.", readTime: "4 min", author: "Lindiwe Mokoena, RD", date: "April 2026" },
  { id: "a8", category: "Science", title: "Managing Cannabis Withdrawal: A Week-by-Week Guide", summary: "What to expect each week of your recovery journey, from acute withdrawal to long-term healing.", readTime: "12 min", author: "CannaClear Clinical Team", date: "May 2026" },
  { id: "a9", category: "Mental Health", title: "Cannabis and Relationships: Rebuilding Trust After Dependency", summary: "How to repair relationships damaged by cannabis use and communicate your recovery journey.", readTime: "8 min", author: "Dr. Sarah Nkosi", date: "April 2026" },
  { id: "a10", category: "Mental Health", title: "Mindfulness and Addiction: What the Research Actually Shows", summary: "The evidence behind mindfulness as a tool for managing cravings and preventing relapse.", readTime: "6 min", author: "Dr. Thabo Molefe", date: "May 2026" },
  { id: "a11", category: "Cannabis & SA", title: "Cannabis in SA: Legal Changes and What They Mean for Users", summary: "A clear breakdown of South Africa's cannabis laws and how they affect users and recovery.", readTime: "5 min", author: "CannaClear Legal Desk", date: "May 2026" },
  { id: "a12", category: "Sleep", title: "Sleep Hygiene for Cannabis Recovery: 12 Evidence-Based Tips", summary: "Practical, research-backed strategies for rebuilding healthy sleep after cannabis cessation.", readTime: "7 min", author: "Dr. Sarah Nkosi", date: "May 2026" },
]

const filterTabs = ["All", "Science", "Nutrition", "Sleep", "Mental Health", "Cannabis & SA"]

export default function ResearchPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [activeArticle, setActiveArticle] = useState<string | null>(null)

  const featured = allArticles.find((a) => a.id === "a8")!

  const filtered = allArticles.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "All" || a.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div id="main-content" className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Research &amp; Recovery Library</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Evidence-based information to support your recovery — written for real people, not researchers.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full rounded-lg border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          style={{ borderColor: 'hsl(var(--border))' }}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {filterTabs.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <button
        onClick={() => setActiveArticle(featured.id)}
        className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 sm:p-8 text-left text-white shadow-md"
      >
        <span className="tag-accent text-white mb-3 inline-block bg-accent/90 text-[10px]">
          This Week&apos;s Focus
        </span>
        <h2 className="text-xl font-bold sm:text-2xl mb-2 text-white">{featured.title}</h2>
        <p className="text-sm text-white/85 line-clamp-3 max-w-xl">{featured.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white">
          Read Article <ArrowRight className="size-3.5" />
        </span>
      </button>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard
            key={article.id}
            {...article}
            onClick={() => setActiveArticle(article.id)}
          />
        ))}
      </div>

      <FAQAccordion />

      <AnimatePresence>
        {activeArticle && (
          <ArticleReader
            key={activeArticle}
            articleId={activeArticle}
            onClose={() => setActiveArticle(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
