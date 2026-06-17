"use client"

import { useRouter } from "next/navigation"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const alerts = [
  {
    priority: "HIGH",
    icon: AlertTriangle,
    border: "#F87171",
    bg: 'linear-gradient(135deg, rgba(90,30,18,0.15) 0%, rgba(140,50,30,0.08) 100%)',
    borderColor: '1px solid rgba(248,113,113,0.25)',
    user: "User #A09",
    day: "Day 6",
    tier: "Moderate",
    reason: "Opened crisis support 3 times in past 24 hours. Craving score: 9/10.",
  },
  {
    priority: "MEDIUM",
    icon: AlertCircle,
    border: "#F0B429",
    bg: 'linear-gradient(135deg, rgba(92,58,0,0.10) 0%, rgba(168,107,0,0.05) 100%)',
    borderColor: '1px solid rgba(240,180,41,0.25)',
    user: "User #B15",
    day: "Day 22",
    tier: "Heavy",
    reason: "No check-in logged in 4 days. Program progress stalled at Week 3.",
  },
  {
    priority: "LOW",
    icon: Info,
    border: "#4ADE80",
    bg: 'linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(74,222,128,0.03) 100%)',
    borderColor: '1px solid rgba(74,222,128,0.20)',
    user: "User #C31",
    day: "Day 11",
    tier: "Mild",
    reason: "Reported mood score of 2/10 for 3 consecutive days.",
  },
]

export default function AlertFlags() {
  const router = useRouter()
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: '#F2F7F1' }}>Requires Clinical Attention</h3>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: 'rgba(248,113,113,0.15)', color: '#F87171' }}>3</span>
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
                style={{ backgroundColor: alert.border }}
              >
                {alert.priority}
              </span>
              <span className="text-xs font-semibold" style={{ color: '#F2F7F1' }}>{alert.user}</span>
              <span className="text-[10px]" style={{ color: '#74917B' }}>{alert.day} &middot; {alert.tier}</span>
            </div>
            <p className="text-sm mb-2" style={{ color: '#B9D0BE' }}>{alert.reason}</p>
            <div className="flex gap-1.5">
              <Button className="rounded-full h-7 text-[10px]" style={{ backgroundColor: '#4ADE80', color: '#07100B' }} onClick={() => router.push("/admin/users")}>View Profile</Button>
              <Button onClick={() => toast.info(i === 0 ? "Check-in scheduled" : i === 1 ? "Prompt sent to user" : "Note already recorded")} className="rounded-full h-7 text-[10px]" style={{ backgroundColor: 'transparent', border: '1px solid #1F3326', color: '#74917B' }}>
                {i === 1 ? "Send Prompt" : i === 2 ? "Note Added" : "Schedule Check-in"}
              </Button>
              <Button onClick={() => toast.success("Alert dismissed")} className="rounded-full h-7 text-[10px] ml-auto" style={{ backgroundColor: 'transparent', border: '1px solid #1F3326', color: '#74917B' }}>Dismiss</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
