import { Wind, Moon, Apple, PenLine, BookOpen, HeartPulse } from "lucide-react"
import Link from "next/link"

const tools = [
  { icon: Wind, label: "Breathing", href: "/tools#breathing", bg: "hsl(155 50% 32%/0.2)", color: "hsl(155 50% 60%)" },
  { icon: Moon, label: "Sleep Log", href: "/tools#sleep", bg: "hsl(250 40% 48%/0.2)", color: "hsl(250 40% 70%)" },
  { icon: Apple, label: "Nutrition", href: "/tools#nutrition", bg: "hsl(38 75% 48%/0.2)", color: "hsl(38 75% 65%)" },
  { icon: PenLine, label: "Journal", href: "/journal", bg: "hsl(var(--primary)/0.15)", color: "hsl(152 55% 60%)" },
  { icon: BookOpen, label: "Research", href: "/research", bg: "hsl(200 55% 48%/0.2)", color: "hsl(200 55% 65%)" },
  { icon: HeartPulse, label: "Crisis Help", href: "#crisis", bg: "hsl(8 65% 58%/0.15)", color: "hsl(8 65% 68%)" },
]

export default function QuickTools() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {tools.map((tool) => (
        <Link
          key={tool.label}
          href={tool.href}
          className="flex flex-col items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200 active:scale-95"
          style={{ background: 'hsl(var(--card))', boxShadow: '0 0 0 1px hsl(var(--border)/0.4)' }}
        >
          <div
            className="flex size-12 items-center justify-center rounded-2xl"
            style={{ background: tool.bg }}
          >
            <tool.icon className="size-6" style={{ color: tool.color }} />
          </div>
          <span className="text-xs font-semibold text-foreground text-center">{tool.label}</span>
        </Link>
      ))}
    </div>
  )
}
