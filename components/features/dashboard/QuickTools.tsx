import { Wind, Moon, Apple, PenLine, BookOpen, HeartPulse } from "lucide-react"
import Link from "next/link"

const tools = [
  { icon: Wind, label: "Breathing", href: "/tools#breathing", iconBg: "hsl(var(--sage-light))", iconColor: "hsl(var(--forest))" },
  { icon: Moon, label: "Sleep Log", href: "/tools#sleep", iconBg: "hsl(var(--sage-light))", iconColor: "hsl(var(--forest))" },
  { icon: Apple, label: "Nutrition", href: "/tools#nutrition", iconBg: "hsl(var(--sage-light))", iconColor: "hsl(var(--forest))" },
  { icon: PenLine, label: "Journal", href: "/journal", iconBg: "hsl(var(--sage-light))", iconColor: "hsl(var(--forest))" },
  { icon: BookOpen, label: "Research", href: "/research", iconBg: "hsl(var(--sage-light))", iconColor: "hsl(var(--forest))" },
  { icon: HeartPulse, label: "Crisis Help", href: "#crisis", iconBg: "hsl(var(--coral-light))", iconColor: "hsl(var(--coral))" },
]

export default function QuickTools() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {tools.map((tool) => (
        <Link
          key={tool.label}
          href={tool.href}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--sage-mist)) 100%)`,
            border: '1px solid hsl(var(--border))',
            boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(13,61,36,0.08))',
          }}
        >
          <div className="icon-circle flex size-10 items-center justify-center rounded-full transition-transform duration-200"
            style={{ background: tool.iconBg }}
          >
            <tool.icon className="size-5" style={{ color: tool.iconColor }} />
          </div>
          <span className="text-xs font-medium text-foreground">{tool.label}</span>
        </Link>
      ))}
    </div>
  )
}
