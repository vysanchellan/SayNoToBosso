import { Clock, ArrowRight } from "lucide-react"

const categoryColors: Record<string, { bg: string; text: string }> = {
  Science: { bg: 'hsl(210,40%,92%)', text: 'hsl(210,65%,35%)' },
  Nutrition: { bg: 'hsl(30,80%,92%)', text: 'hsl(25,70%,40%)' },
  Sleep: { bg: 'hsl(240,50%,92%)', text: 'hsl(240,55%,40%)' },
  "Mental Health": { bg: 'hsl(280,30%,92%)', text: 'hsl(280,45%,45%)' },
  "Cannabis & SA": { bg: 'hsl(42,90%,92%)', text: 'hsl(38,85%,35%)' },
}

const categoryIconColors: Record<string, string> = {
  Science: 'hsl(210,65%,35%)',
  Nutrition: 'hsl(25,70%,40%)',
  Sleep: 'hsl(240,55%,40%)',
  "Mental Health": 'hsl(280,45%,45%)',
  "Cannabis & SA": 'hsl(38,85%,35%)',
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
  const cc = categoryColors[category] || { bg: 'hsl(var(--muted))', text: 'hsl(var(--muted-foreground))' }

  return (
    <button
      onClick={onClick}
      className="group flex flex-col rounded-2xl border bg-card p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
      style={{
        borderColor: 'hsl(var(--border))',
        boxShadow: '0 2px 8px rgba(13,61,36,0.05)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
          style={{ background: cc.bg, color: cc.text }}
        >
          {category}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="size-3" /> {readTime}
        </span>
      </div>

      <h3
        className="text-base font-semibold mb-2 group-hover:underline underline-offset-2 transition-colors"
        style={{ color: 'hsl(var(--forest))' }}
      >
        {title}
      </h3>

      <p className="text-sm leading-relaxed line-clamp-2 mb-4 flex-1" style={{ color: 'hsl(var(--text-secondary))' }}>
        {summary}
      </p>

      <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: '1px solid hsl(var(--border))' }}>
        <span className="text-xs text-muted-foreground">
          {author} · {date}
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-1.5" style={{ color: 'hsl(var(--primary))' }}>
          Read <ArrowRight className="size-3" />
        </span>
      </div>
    </button>
  )
}
