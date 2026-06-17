import type { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface KPICardProps {
  label: string
  value: string
  trend: string
  icon: LucideIcon
  variant: "slate" | "amber" | "forest" | "coral"
  children?: ReactNode
}

const accentStyles = {
  slate: { bg: 'hsl(210 50% 48% / 0.12)', color: 'hsl(210 50% 65%)' },
  amber: { bg: 'hsl(38 75% 48% / 0.12)', color: 'hsl(38 75% 65%)' },
  forest: { bg: 'hsl(152 55% 50% / 0.12)', color: 'hsl(152 55% 65%)' },
  coral: { bg: 'hsl(8 65% 58% / 0.12)', color: 'hsl(8 65% 68%)' },
}

export default function KPICard({ label, value, trend, icon: Icon, variant, children }: KPICardProps) {
  const ac = accentStyles[variant]
  return (
    <div className="rounded-2xl p-5 relative" style={{ background: 'hsl(var(--card))', boxShadow: '0 0 0 1px hsl(var(--border) / 0.4)' }}>
      <div className="absolute top-4 right-4 size-10 rounded-xl flex items-center justify-center" style={{ background: ac.bg }}>
        <Icon className="size-5" style={{ color: ac.color }} />
      </div>
      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</p>
      <p className="text-4xl font-bold tracking-tight mt-1 font-display" style={{ color: 'hsl(var(--foreground))' }}>{value}</p>
      <p className="text-xs mt-2 flex items-center gap-1" style={{ color: ac.color }}>{trend}</p>
      {children}
    </div>
  )
}
