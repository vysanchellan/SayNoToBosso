"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  Leaf,
  Flame,
  LogOut,
  Settings,
  User,
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
  DropdownMenuSeparator,
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
  const router = useRouter()
  const { user } = useDemo()
  const displayName = user?.name || "User"
  const initials = getInitials(displayName)
  const daysEngaged = user?.streak || 14
  const dayInProgram = user?.dayInProgram || 14
  const currentWeek = user?.currentWeek || 2

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <Sidebar
          variant="inset"
          collapsible="icon"
          className="border-r text-white"
          style={{
            background: 'hsl(var(--sidebar-background))',
            borderColor: 'hsl(var(--sidebar-border))',
          }}
        >
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1">
              <Leaf className="size-5 text-amber-400 shrink-0" />
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
                          className={active ? "text-amber-400 font-medium" : "text-sidebar-foreground hover:text-white"}
                          style={
                            active
                              ? { background: 'hsl(var(--sidebar-accent))', borderLeft: '2px solid hsl(var(--sidebar-primary))' }
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
                      <span className="text-amber-400 text-xs">✦</span>
                      <span className="text-amber-400 text-xs font-semibold tabular-nums">{daysEngaged}</span>
                      <span className="text-sidebar-foreground text-xs">days engaged</span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6 border-border">
              <SidebarTrigger />
              <div className="flex flex-1 items-center justify-between gap-4">
                <h1 className="text-lg font-semibold text-foreground">
                  {pathname === "/dashboard" ? "Dashboard" : ""}
                </h1>
                <div className="hidden sm:flex items-center">
                  <div className="flex items-center gap-2 min-w-fit rounded-full bg-primary/12 dark:bg-primary/20 px-3 py-1 border border-primary/25 dark:border-primary/40">
                    <Leaf className="size-3.5 text-primary dark:text-[hsl(155,60%,70%)]" />
                    <span className="text-xs font-semibold text-primary dark:text-[hsl(155,60%,70%)] tabular-nums">Day {dayInProgram} of 70</span>
                    <span className="text-primary/40 dark:text-[hsl(155,60%,70%)/40]">|</span>
                    <span className="text-xs font-medium text-primary dark:text-[hsl(155,60%,70%)]">Week {currentWeek}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <button
                    onClick={() => router.push("/notifications")}
                    className="relative size-9 rounded-xl flex items-center justify-center bg-muted dark:bg-sidebar-accent hover:bg-muted/80 dark:hover:bg-sidebar-accent/80 border border-border dark:border-sidebar-border transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="size-4 text-muted-foreground" />
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1">
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
                    <DropdownMenuContent align="end" className="w-64 rounded-2xl border bg-popover shadow-xl p-0 overflow-hidden">
                      <div className="bg-muted/50 px-4 py-3 border-b border-border">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="size-10 rounded-full">
                            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{displayName}</p>
                            <p className="text-xs text-muted-foreground">Moderate Use Program</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 font-medium">Day {dayInProgram}</span>
                          <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs rounded-full px-2 py-0.5 font-medium">
                            <Flame className="size-3 inline mr-0.5" />{daysEngaged} streak
                          </span>
                        </div>
                      </div>
                      <div className="py-1">
                        <DropdownMenuItem onSelect={() => router.push("/profile")}>
                          <User className="size-4 mr-2.5" />
                          <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push("/program")}>
                          <BookOpen className="size-4 mr-2.5" />
                          <span>My Program</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push("/journal")}>
                          <PenLine className="size-4 mr-2.5" />
                          <span>Journal</span>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator />
                      <div className="py-1">
                        <DropdownMenuItem onSelect={() => router.push("/notifications")}>
                          <Bell className="size-4 mr-2.5" />
                          <span>Notifications</span>
                          <span className="ml-auto min-w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1">3</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push("/settings")}>
                          <Settings className="size-4 mr-2.5" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator />
                      <div className="py-1">
                        <DropdownMenuItem onSelect={() => router.push("/")} className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10">
                          <LogOut className="size-4 mr-2.5" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </div>
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
