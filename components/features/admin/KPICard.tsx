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

const gradientMap = {
  slate: { bg: 'linear-gradient(135deg, #0F2E4A 0%, #1F5C8C 100%)' },
  amber: { bg: 'linear-gradient(135deg, #5C3A00 0%, #C98A0A 100%)' },
  forest: { bg: 'linear-gradient(135deg, #103D24 0%, #1E6B3F 100%)' },
  coral: { bg: 'linear-gradient(135deg, #5C1810 0%, #C9402A 100%)' },
}

export default function KPICard({ label, value, trend, icon: Icon, variant, children }: KPICardProps) {
  return (
    <div className="rounded-2xl p-5 relative" style={{ background: gradientMap[variant].bg, border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="absolute top-4 right-4 size-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
        <Icon className="size-5 text-white" />
      </div>
      <p className="text-sm font-medium" style={{ color: 'rgba(242,247,241,0.75)' }}>{label}</p>
      <p className="text-4xl font-bold tracking-tight mt-1 font-display" style={{ color: '#F2F7F1' }}>{value}</p>
      <p className="text-xs mt-2 font-medium flex items-center gap-1" style={{ color: '#86EFAC' }}>{trend}</p>
      {children}
    </div>
  )
}
