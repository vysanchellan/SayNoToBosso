"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, BarChart3, BookOpen, MessageSquare, Settings,
  AlertTriangle, ChevronDown, Menu, Download, LogOut, Leaf,
} from "lucide-react"
import { useDemo } from "@/lib/demo-context"

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
    <div className="flex h-screen" style={{ backgroundColor: '#07100B' }}>
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: 'linear-gradient(180deg, #050B07 0%, #0A1610 100%)',
          borderRight: '1px solid #1F3326',
        }}
      >
        <div className="flex items-center gap-2 px-6 pt-6 pb-4">
          <Leaf className="size-5 shrink-0" style={{ color: '#4ADE80' }} />
          <div>
            <p className="text-lg font-bold tracking-tight" style={{ color: '#F2F7F1' }}>CannaClear</p>
            <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: 'rgba(240,180,41,0.12)', color: '#F0B429' }}>Clinical Admin</span>
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={
                  active
                    ? {
                        backgroundColor: 'rgba(240,180,41,0.12)',
                        color: '#F0B429',
                        borderLeft: '2px solid #F0B429',
                      }
                    : { color: '#B9D0BE' }
                }
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
          <div className="my-2 mx-4 h-px" style={{ backgroundColor: '#1F3326' }} />
          <Link
            href="/admin/flags"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={{
              color: pathname === "/admin/flags" ? '#F87171' : '#F87171',
              backgroundColor: pathname === "/admin/flags" ? 'rgba(248,113,113,0.10)' : 'transparent',
            }}
          >
            <AlertTriangle className="size-4 shrink-0" />
            Alert Flags
          </Link>
          <div className="my-2 mx-4 h-px" style={{ backgroundColor: '#1F3326' }} />
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={{ color: '#B9D0BE' }}
          >
            <LogOut className="size-4 shrink-0" />
            Sign Out
          </Link>
        </nav>

        <div className="mx-2 mb-3 p-3 rounded-xl" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #103D24, #1A5C38)', color: '#F2F7F1' }}>
              {adminInitials}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#F2F7F1' }}>{adminName}</p>
              <p className="text-xs" style={{ color: '#74917B' }}>{adminRole}</p>
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
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 py-3"
          style={{ backgroundColor: '#0A1610', boxShadow: '0 1px 0 0 #1F3326' }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden" aria-label="Open sidebar">
              <Menu className="size-5" style={{ color: '#B9D0BE' }} />
            </button>
            <div className="text-sm" style={{ color: '#74917B' }}>
              <span className="font-medium" style={{ color: '#F2F7F1' }}>CannaClear Admin</span>
              <span className="mx-1.5" style={{ color: '#445347' }}>/</span>
              <span style={{ color: '#F2F7F1' }}>Facility Overview</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-28 rounded-lg px-2.5 py-1.5 text-xs text-center font-medium"
              style={{ backgroundColor: '#142219', color: '#B9D0BE' }}
            >
              Jun 2026
            </div>
            <button
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ backgroundColor: 'rgba(74,222,128,0.12)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)' }}
            >
              <Download className="size-3.5" />
              Export CSV
            </button>
            <div className="flex items-center gap-2">
              <div
                className="size-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background: 'linear-gradient(135deg, #103D24, #1A5C38)', color: '#F2F7F1' }}
              >
                {adminInitials}
              </div>
              <ChevronDown className="size-3" style={{ color: '#74917B' }} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6" style={{ backgroundColor: '#07100B', color: '#B9D0BE' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
