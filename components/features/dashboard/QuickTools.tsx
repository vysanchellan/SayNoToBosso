import { Wind, Moon, Apple, PenLine, BookOpen, HeartPulse } from "lucide-react"
import Link from "next/link"

const tools = [
  { icon: Wind, label: "Breathing", href: "/tools#breathing", color: "bg-green-100 text-green-500" },
  { icon: Moon, label: "Sleep Log", href: "/tools#sleep", color: "bg-blue-100 text-blue-500" },
  { icon: Apple, label: "Nutrition", href: "/tools#nutrition", color: "bg-orange-100 text-orange-500" },
  { icon: PenLine, label: "Journal", href: "/journal", color: "bg-purple-100 text-purple-500" },
  { icon: BookOpen, label: "Research", href: "/research", color: "bg-amber-100 text-amber-500" },
  { icon: HeartPulse, label: "Crisis Help", href: "#crisis", color: "bg-red-100 text-red-500" },
]

export default function QuickTools() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {tools.map((tool) => (
        <Link
          key={tool.label}
          href={tool.href}
          className="flex flex-col items-center gap-2 rounded-xl border bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <div className={`flex size-10 items-center justify-center rounded-full ${tool.color}`}>
            <tool.icon className="size-5" />
          </div>
          <span className="text-xs font-medium text-foreground">{tool.label}</span>
        </Link>
      ))}
    </div>
  )
}
