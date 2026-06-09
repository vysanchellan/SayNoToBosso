import type { LucideIcon } from "lucide-react"

interface KPICardProps {
  label: string
  value: string
  trend: string
  trendDir: "up" | "down"
  icon: LucideIcon
  iconBg: string
}

export default function KPICard({ label, value, trend, trendDir, icon: Icon, iconBg }: KPICardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 relative">
      <div className={`absolute top-4 right-4 size-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon className="size-5 text-white" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
      <p className={`text-xs mt-2 flex items-center gap-1 ${trendDir === "up" ? "text-green-600" : "text-rose-600"}`}>
        <span>{trendDir === "up" ? "↑" : "↓"}</span>
        {trend}
      </p>
    </div>
  )
}
