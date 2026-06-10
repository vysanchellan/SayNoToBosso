import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

const alerts = [
  {
    priority: "HIGH",
    icon: AlertTriangle,
    border: "hsl(var(--coral))",
    bg: 'linear-gradient(135deg, rgba(61,16,8,0.08) 0%, rgba(140,42,20,0.05) 100%)',
    borderColor: '1px solid rgba(224,80,58,0.20)',
    badge: "bg-coral",
    user: "User #A09",
    day: "Day 6",
    tier: "Moderate",
    reason: "Opened crisis support 3 times in past 24 hours. Craving score: 9/10.",
  },
  {
    priority: "MEDIUM",
    icon: AlertCircle,
    border: "hsl(var(--amber))",
    bg: 'linear-gradient(135deg, rgba(92,58,0,0.06) 0%, rgba(168,107,0,0.03) 100%)',
    borderColor: '1px solid rgba(217,146,10,0.20)',
    badge: "bg-amber",
    user: "User #B15",
    day: "Day 22",
    tier: "Heavy",
    reason: "No check-in logged in 4 days. Program progress stalled at Week 3.",
  },
  {
    priority: "LOW",
    icon: Info,
    border: "hsl(var(--sage))",
    bg: 'linear-gradient(135deg, rgba(86,138,101,0.06) 0%, rgba(86,138,101,0.03) 100%)',
    borderColor: '1px solid rgba(86,138,101,0.20)',
    badge: "bg-sage",
    user: "User #C31",
    day: "Day 11",
    tier: "Mild",
    reason: "Reported mood score of 2/10 for 3 consecutive days.",
  },
]

export default function AlertFlags() {
  return (
    <div className="rounded-2xl border bg-card p-5" style={{ borderColor: 'hsl(var(--border))' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Requires Clinical Attention</h3>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: 'hsl(var(--coral) / 0.15)', color: 'hsl(var(--coral))' }}>3</span>
      </div>
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className="rounded-xl p-3"
            style={{
              background: alert.bg,
              borderLeft: `3px solid ${alert.border}`,
              border: alert.borderColor,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <alert.icon className="size-4" style={{ color: alert.border }} />
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
                style={{ background: alert.border }}
              >
                {alert.priority}
              </span>
              <span className="text-xs font-semibold">{alert.user}</span>
              <span className="text-[10px] text-muted-foreground">{alert.day} · {alert.tier}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{alert.reason}</p>
            <div className="flex gap-1.5">
              <Button className="rounded-full h-7 text-[10px] bg-primary text-primary-foreground hover:bg-primary/90">View Profile</Button>
              <Button className="rounded-full h-7 text-[10px] border text-muted-foreground hover:bg-muted" style={{ borderColor: 'hsl(var(--border))', background: 'transparent' }}>
                {i === 1 ? "Send Prompt" : i === 2 ? "Note Added" : "Schedule Check-in"}
              </Button>
              <Button className="rounded-full h-7 text-[10px] border text-muted-foreground hover:bg-muted ml-auto" style={{ borderColor: 'hsl(var(--border))', background: 'transparent' }}>Dismiss</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
