"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, BarChart3, BookOpen, MessageSquare, Settings,
  AlertTriangle, ChevronDown, Menu, Download, LogOut,
} from "lucide-react"
import { useDemo } from "@/lib/demo-context"
import ThemeToggle from "@/components/ui/ThemeToggle"

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

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
  const { admin } = useDemo()
  const adminName = admin?.name || "Admin"
  const adminRole = admin?.role || ""
  const adminInitials = getInitials(adminName)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex h-screen" style={{ background: 'hsl(var(--background))' }}>
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col text-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: 'linear-gradient(180deg, #060E09 0%, #0A1A0E 60%, #071209 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-2 px-6 pt-6 pb-4">
          <div>
            <p className="text-lg font-bold tracking-tight text-white">CannaClear</p>
            <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: 'rgba(217,146,10,0.15)', color: 'hsl(38,85%,55%)', border: '1px solid rgba(217,146,10,0.2)' }}>
              Clinical Admin
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mx-0 text-sm font-medium transition-all duration-150 cursor-pointer ${
                  active
                    ? "text-amber-400 bg-amber-400/10 border-l-2 border-amber-400"
                    : "text-[hsl(145,25%,62%)] hover:text-[hsl(145,25%,85%)] hover:bg-white/[0.05]"
                }`}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
          <div className="my-2 mx-4 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <Link
            href="/admin/flags"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mx-0 text-sm font-medium transition-all duration-150 cursor-pointer ${
              pathname === "/admin/flags"
                ? "text-red-300 bg-red-400/10"
                : "text-red-400 hover:bg-red-400/10"
            }`}
          >
            <AlertTriangle className="size-4 shrink-0" />
            Alert Flags
          </Link>
          <div className="my-2 mx-4 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl mx-0 text-sm font-medium transition-all duration-150 cursor-pointer text-[hsl(145,25%,62%)] hover:text-[hsl(145,25%,85%)] hover:bg-white/[0.05]"
          >
            <LogOut className="size-4 shrink-0" />
            Sign Out
          </Link>
        </nav>

        <div className="mx-2 mb-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, hsl(155,48%,22%), hsl(155,55%,16%))', color: 'white' }}>
              {adminInitials}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'hsl(145,25%,85%)' }}>{adminName}</p>
              <p className="text-xs" style={{ color: 'hsl(145,15%,48%)' }}>{adminRole}</p>
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
        <header className="sticky top-0 z-30 flex items-center justify-between border-b px-4 lg:px-6 py-3" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
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
            <input type="text" placeholder="Jun 2026" className="w-28 rounded-lg border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" style={{ borderColor: 'hsl(var(--input))' }} />
            <button className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors" style={{ borderColor: 'hsl(var(--border))' }}>
              <Download className="size-3.5" />
              Export CSV
            </button>
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'hsl(var(--primary) / 0.2)', color: 'hsl(var(--primary))' }}>NS</div>
              <ChevronDown className="size-3 text-muted-foreground" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-background text-foreground">
          {children}
        </main>
      </div>
    </div>
  )
}
