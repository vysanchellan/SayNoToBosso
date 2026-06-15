"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Wrench,
  PenLine,
  FlaskConical,
  Users,
  UserCircle,
  HeartPulse,
  Bell,
  ChevronDown,
} from "lucide-react"
import { useDemo } from "@/lib/demo-context"
import CrisisModal from "@/components/features/dashboard/CrisisModal"
import ThemeToggle from "@/components/ui/ThemeToggle"
import MobileBottomNav from "@/components/layout/MobileBottomNav"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { label: "My Program", icon: BookOpen, href: "/program" },
  { label: "Daily Tools", icon: Wrench, href: "/tools" },
  { label: "Journal", icon: PenLine, href: "/journal" },
  { label: "Research", icon: FlaskConical, href: "/research" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "Profile", icon: UserCircle, href: "/profile" },
]

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { user } = useDemo()
  const displayName = user?.name || "User"
  const initials = getInitials(displayName)
  const firstName = user?.firstName || "User"
  const streak = user?.streak || 0

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <Sidebar
          variant="inset"
          collapsible="icon"
          style={{
            background: 'linear-gradient(180deg, #060E09 0%, #0A1A0E 60%, #071209 100%)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}
          className="text-white"
        >
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1">
              <svg width="24" height="24" viewBox="0 0 200 50" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M12 38c0-8 6-14 14-14s14 6 14 14" stroke="hsl(38,85%,55%)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M26 10c0 8-4 14-10 14s-10-6-10-14" stroke="hsl(145,28%,48%)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M26 10c0 8 4 14 10 14s10-6 10-14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <text x="48" y="28" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="18" fill="white">CC</text>
              </svg>
              <span className="text-sm font-semibold text-white group-data-[collapsible=icon]:hidden">
                CannaClear
              </span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => {
                    const active = pathname === item.href
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          isActive={active}
                          tooltip={item.label}
                          render={<Link href={item.href} />}
                          className={active ? "text-amber-400" : "text-[hsl(145,25%,62%)]"}
                          style={
                            active
                              ? { background: 'rgba(217,146,10,0.15)', borderLeft: '2px solid hsl(38,85%,55%)' }
                              : {}
                          }
                        >
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip="Crisis Support"
                      className="text-red-400 hover:bg-red-400/10 hover:text-red-300 data-active:bg-red-400/10 data-active:text-red-300"
                      onClick={() => window.__openCrisisModal?.()}
                    >
                      <HeartPulse />
                      <span>Crisis Support</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Avatar className="size-6 shrink-0">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-white">{displayName}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-amber-400 text-xs">🔥</span>
                      <span className="text-amber-400 text-xs font-semibold tabular-nums">{streak}</span>
                      <span style={{ color: 'hsl(145,15%,45%)' }} className="text-xs">day streak</span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6" style={{ borderColor: 'hsl(var(--border))' }}>
              <SidebarTrigger />
              <div className="flex flex-1 items-center justify-between gap-4">
                <h1 className="text-lg font-semibold text-foreground">
                  {pathname === "/dashboard" ? "Dashboard" : ""}
                </h1>
                <div className="hidden sm:flex items-center">
                  <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: 'hsl(var(--secondary) / 0.2)', color: 'hsl(var(--secondary))' }}>
                    Day {user?.dayInProgram || 14} of 70 &mdash; Week {user?.currentWeek || 2}: Brain Reset
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <button className="relative p-1 text-muted-foreground hover:text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Notifications">
                    <Bell className="size-5" />
                    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: 'hsl(var(--destructive))', color: 'hsl(var(--destructive-foreground))' }}>
                      3
                    </span>
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<button className="flex items-center gap-2" aria-label="User menu" />}>
                      <Avatar className="size-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="size-4 text-muted-foreground hidden sm:block" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href="/profile" className="w-full">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/settings" className="w-full">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/" className="w-full">Sign Out</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 bg-background text-foreground">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
      <CrisisModal />
      <MobileBottomNav />
    </SidebarProvider>
  )
}
