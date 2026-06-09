import { Clock } from "lucide-react"

const categoryColors: Record<string, string> = {
  Science: "bg-blue-100 text-blue-700",
  Nutrition: "bg-orange-100 text-orange-700",
  Sleep: "bg-indigo-100 text-indigo-700",
  "Mental Health": "bg-purple-100 text-purple-700",
  "Cannabis & SA": "bg-amber-100 text-amber-700",
}

export default function ArticleCard({
  category,
  title,
  summary,
  readTime,
  author,
  date,
  featured,
  onClick,
}: {
  category: string
  title: string
  summary: string
  readTime: string
  author: string
  date: string
  featured?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col rounded-2xl border bg-white p-5 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${
        featured ? "border-primary/20 hover:border-primary/40" : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${categoryColors[category] || "bg-muted text-muted-foreground"}`}>
          {category}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="size-3" /> {readTime}
        </span>
      </div>

      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
        {summary}
      </p>

      <div className="flex items-center justify-between border-t pt-3 mt-auto">
        <span className="text-xs text-muted-foreground">
          {author} · {date}
        </span>
        <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Read Article →
        </span>
      </div>
    </button>
  )
}
