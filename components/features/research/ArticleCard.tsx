import { Clock, ArrowRight } from "lucide-react"

const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
  Science: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  Nutrition: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  Sleep: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  "Mental Health": { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  "Cannabis & SA": { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
}

export default function ArticleCard({
  category,
  title,
  summary,
  readTime,
  author,
  date,
  onClick,
}: {
  category: string
  title: string
  summary: string
  readTime: string
  author: string
  date: string
  onClick: () => void
}) {
  const cs = categoryStyles[category] || { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' }

  return (
    <button
      onClick={onClick}
      className="group flex flex-col rounded-2xl bg-card p-4 text-left transition-all duration-200 hover:shadow-md" style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${cs.bg} ${cs.text} ${cs.border}`}>
          {category}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" /> {readTime}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-foreground leading-snug mt-1">
        {title}
      </h3>

      <p className="text-xs text-muted-foreground mt-1 line-clamp-3 flex-1">
        {summary}
      </p>

      <div className="flex items-center justify-between pt-3 mt-auto border-t border-border">
        <span className="text-xs text-muted-foreground">
          {author} &middot; {date}
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold text-primary transition-all group-hover:gap-1.5">
          Read <ArrowRight className="size-3" />
        </span>
      </div>
    </button>
  )
}
