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
                              ? {
                                  background: 'hsl(var(--primary) / 0.12)',
                                  borderLeft: '2px solid hsl(var(--primary))',
                                  boxShadow: 'inset 0 0 20px hsl(var(--primary) / 0.05)',
                                }
                              : {}
                          }
                        >
                          <span className={`flex size-7 items-center justify-center rounded-lg ${active ? 'bg-primary/15' : ''}`}>
                            <item.icon className="size-4" />
                          </span>
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
                      <span className="flex size-7 items-center justify-center rounded-lg bg-red-400/10">
                        <HeartPulse className="size-4" />
                      </span>
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
            <header
              className="sticky top-0 z-30 flex h-14 items-center gap-4 px-4 sm:px-6"
              style={{
                background: 'hsl(var(--sidebar-background))',
                boxShadow: '0 1px 0 0 hsl(var(--sidebar-border))',
              }}
            >
              <SidebarTrigger />
              <div className="flex flex-1 items-center justify-center gap-4">
                <div className="hidden sm:flex items-center">
                  <div className="flex items-center gap-2 min-w-fit rounded-full px-3 py-1" style={{ background: 'hsl(var(--primary) / 0.15)', boxShadow: '0 0 0 1px hsl(var(--primary) / 0.3)' }}>
                    <Leaf className="size-3.5" style={{ color: 'hsl(var(--primary))' }} />
                    <span className="text-xs font-semibold tabular-nums" style={{ color: 'hsl(var(--primary))' }}>Day {dayInProgram} of 70</span>
                    <span style={{ color: 'hsl(var(--primary) / 0.4)' }}>|</span>
                    <span className="text-xs font-medium" style={{ color: 'hsl(152 55% 65%)' }}>Week {currentWeek}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.push("/notifications")}
                    className="relative size-9 rounded-xl flex items-center justify-center transition-colors"
                    style={{ background: 'hsl(var(--sidebar-accent))' }}
                    aria-label="Notifications"
                  >
                    <Bell className="size-4" style={{ color: 'hsl(var(--sidebar-foreground))' }} />
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
                      <ChevronDown className="size-4 hidden sm:block" style={{ color: 'hsl(var(--sidebar-foreground))' }} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-64 rounded-2xl border-0 p-0 overflow-hidden"
                      style={{ background: 'hsl(var(--sidebar-background))', boxShadow: '0 0 0 1px hsl(var(--sidebar-border)), 0 8px 32px hsl(160 28% 4% / 0.6)' }}
                    >
                      <div className="px-4 py-3" style={{ background: 'hsl(var(--sidebar-accent))' }}>
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="size-10 rounded-full">
                            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-white">{displayName}</p>
                            <p className="text-xs" style={{ color: 'hsl(var(--sidebar-foreground))' }}>Moderate Use Program</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: 'hsl(var(--primary) / 0.15)', color: 'hsl(152 55% 65%)' }}>
                            Day {dayInProgram}
                          </span>
                          <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: 'hsl(var(--accent) / 0.15)', color: 'hsl(var(--accent))' }}>
                            <Flame className="size-3 inline mr-0.5" />{daysEngaged} streak
                          </span>
                        </div>
                      </div>
                      <div className="py-1" style={{ background: 'hsl(var(--sidebar-background))' }}>
                        <DropdownMenuItem onSelect={() => router.push("/profile")} className="text-sm" style={{ color: 'hsl(var(--sidebar-foreground))' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ background: 'hsl(var(--sidebar-accent))' }}>
                            <User className="size-3.5" />
                          </span>
                          <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push("/program")} className="text-sm" style={{ color: 'hsl(var(--sidebar-foreground))' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ background: 'hsl(var(--sidebar-accent))' }}>
                            <BookOpen className="size-3.5" />
                          </span>
                          <span>My Program</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push("/journal")} className="text-sm" style={{ color: 'hsl(var(--sidebar-foreground))' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ background: 'hsl(var(--sidebar-accent))' }}>
                            <PenLine className="size-3.5" />
                          </span>
                          <span>Journal</span>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator style={{ background: 'hsl(var(--sidebar-border))' }} />
                      <div className="py-1" style={{ background: 'hsl(var(--sidebar-background))' }}>
                        <DropdownMenuItem onSelect={() => router.push("/notifications")} className="text-sm" style={{ color: 'hsl(var(--sidebar-foreground))' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ background: 'hsl(var(--sidebar-accent))' }}>
                            <Bell className="size-3.5" />
                          </span>
                          <span>Notifications</span>
                          <span className="ml-auto min-w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1">3</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push("/settings")} className="text-sm" style={{ color: 'hsl(var(--sidebar-foreground))' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ background: 'hsl(var(--sidebar-accent))' }}>
                            <Settings className="size-3.5" />
                          </span>
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator style={{ background: 'hsl(var(--sidebar-border))' }} />
                      <div className="py-1" style={{ background: 'hsl(var(--sidebar-background))' }}>
                        <DropdownMenuItem
                          onSelect={() => router.push("/")}
                          className="text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
                        >
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ background: 'hsl(8 65% 58% / 0.15)' }}>
                            <LogOut className="size-3.5" style={{ color: 'hsl(var(--destructive))' }} />
                          </span>
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
