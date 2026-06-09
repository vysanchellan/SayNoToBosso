import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

const alerts = [
  {
    priority: "HIGH",
    icon: AlertTriangle,
    border: "border-rose-300",
    bg: "bg-rose-50",
    iconColor: "text-rose-600",
    badge: "bg-rose-600",
    user: "User #A09",
    day: "Day 6",
    tier: "Moderate",
    reason: "Opened crisis support 3 times in past 24 hours. Craving score: 9/10.",
  },
  {
    priority: "MEDIUM",
    icon: AlertCircle,
    border: "border-amber-300",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    badge: "bg-amber-600",
    user: "User #B15",
    day: "Day 22",
    tier: "Heavy",
    reason: "No check-in logged in 4 days. Program progress stalled at Week 3.",
  },
  {
    priority: "LOW",
    icon: Info,
    border: "border-sage-300",
    bg: "bg-sage-50",
    iconColor: "text-sage-600",
    badge: "bg-sage-600",
    user: "User #C31",
    day: "Day 11",
    tier: "Mild",
    reason: "Reported mood score of 2/10 for 3 consecutive days.",
  },
]

export default function AlertFlags() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Requires Clinical Attention</h3>
        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-700">3</span>
      </div>
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div key={i} className={`rounded-xl border-l-4 ${alert.border} ${alert.bg} p-3`}>
            <div className="flex items-center gap-2 mb-1.5">
              <alert.icon className={`size-4 ${alert.iconColor}`} />
              <span className={`rounded ${alert.badge} px-1.5 py-0.5 text-[9px] font-bold text-white`}>{alert.priority}</span>
              <span className="text-xs font-medium">{alert.user}</span>
              <span className="text-[10px] text-muted-foreground">{alert.day} · {alert.tier}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{alert.reason}</p>
            <div className="flex gap-1.5">
              <Button className="rounded-full h-7 text-[10px] bg-primary text-primary-foreground hover:bg-primary/90">View Profile</Button>
              <Button className="rounded-full h-7 text-[10px] bg-white border border-muted-foreground/20 text-muted-foreground hover:bg-muted">
                {i === 1 ? "Send Prompt" : i === 2 ? "Note Added" : "Schedule Check-in"}
              </Button>
              <Button className="rounded-full h-7 text-[10px] bg-white border border-muted-foreground/20 text-muted-foreground hover:bg-muted ml-auto">Dismiss</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
