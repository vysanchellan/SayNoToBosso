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

const gradientStyles = {
  slate: {
    background: 'linear-gradient(135deg, #0F2035 0%, #1A3A5C 100%)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px rgba(15,32,53,0.50)',
  },
  amber: {
    background: 'linear-gradient(135deg, #5C3A00 0%, #A86B00 100%)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px rgba(92,58,0,0.50)',
  },
  forest: {
    background: 'linear-gradient(135deg, #0A2B18 0%, #1A5C38 100%)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 8px 32px rgba(10,43,24,0.55)',
  },
  coral: {
    background: 'linear-gradient(135deg, #3D1008 0%, #8C2A14 100%)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px rgba(61,16,8,0.55)',
  },
}

export default function KPICard({ label, value, trend, icon: Icon, variant, children }: KPICardProps) {
  return (
    <div className="rounded-2xl p-5 relative text-white" style={gradientStyles[variant]}>
      <div className="absolute top-4 right-4 size-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
        <Icon className="size-5 text-white" />
      </div>
      <p className="text-sm text-white/70">{label}</p>
      <p className="text-4xl font-bold tracking-tight mt-1 font-display">{value}</p>
      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">{trend}</p>
      {children}
    </div>
  )
}
