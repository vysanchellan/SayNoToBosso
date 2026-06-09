"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, BarChart3, BookOpen, MessageSquare, Settings,
  AlertTriangle, ChevronDown, Menu, Download,
} from "lucide-react"
import ThemeToggle from "@/components/ui/ThemeToggle"

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/reports", label: "Progress Reports", icon: BarChart3 },
  { href: "/admin/program", label: "Program Manager", icon: BookOpen },
  { href: "/admin/community", label: "Community", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#F4F6F9]">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#1E2A3A] text-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-6 pt-6 pb-4">
          <div>
            <p className="text-lg font-bold tracking-tight">CannaClear</p>
            <p className="text-[10px] font-medium text-accent/80">Clinical Admin</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-white/10 text-white font-medium" : "text-white/60 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
          <div className="border-t border-white/10 my-3" />
          <Link
            href="/admin/flags"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              pathname === "/admin/flags" ? "bg-white/10 text-white font-medium" : "text-rose-300/70 hover:bg-white/5 hover:text-rose-300"
            }`}
          >
            <AlertTriangle className="size-4 shrink-0" />
            Alert Flags
          </Link>
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-accent/30 flex items-center justify-center text-sm font-bold text-accent">
              NS
            </div>
            <div className="text-xs">
              <p className="font-medium text-white/90">Dr. Naledi Sithole</p>
              <p className="text-white/50">Clinical Director</p>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 lg:px-6 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden" aria-label="Open sidebar">
              <Menu className="size-5 text-muted-foreground" />
            </button>
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">CannaClear Admin</span>
              <span className="mx-1.5 text-muted-foreground/40">/</span>
              <span>Facility Overview</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <input type="text" placeholder="Jun 2026" className="w-28 rounded-lg border border-muted-foreground/20 bg-white px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button className="flex items-center gap-1.5 rounded-lg border border-muted-foreground/20 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors">
              <Download className="size-3.5" />
              Export CSV
            </button>
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">NS</div>
              <ChevronDown className="size-3 text-muted-foreground" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
