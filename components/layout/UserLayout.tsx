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
      <div className="flex min-h-screen w-full" style={{ backgroundColor: '#07100B' }}>
        <Sidebar
          variant="inset"
          collapsible="icon"
          className="border-r"
          style={{
            background: 'linear-gradient(180deg, #050B07 0%, #0A1610 100%)',
            borderColor: '#1F3326',
          }}
        >
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1">
              <Leaf className="size-5 shrink-0" style={{ color: '#4ADE80' }} />
              <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden" style={{ color: '#F2F7F1' }}>
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
                          className={active ? "font-medium" : ""}
                          style={
                            active
                              ? {
                                  backgroundColor: 'rgba(74,222,128,0.12)',
                                  color: '#4ADE80',
                                  borderLeft: '2px solid #4ADE80',
                                }
                              : { color: '#B9D0BE' }
                          }
                        >
                          <span className="flex size-7 items-center justify-center rounded-lg" style={active ? { backgroundColor: 'rgba(74,222,128,0.15)' } : {}}>
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

            <SidebarSeparator style={{ backgroundColor: '#1F3326' }} />

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip="Crisis Support"
                      onClick={() => window.__openCrisisModal?.()}
                      style={{ color: '#F87171' }}
                      className="hover:bg-[rgba(248,113,113,0.10)]"
                    >
                      <span className="flex size-7 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(248,113,113,0.15)' }}>
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
                    <span className="truncate font-semibold" style={{ color: '#F2F7F1' }}>{displayName}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span style={{ color: '#F0B429' }} className="text-xs">✦</span>
                      <span style={{ color: '#F0B429' }} className="text-xs font-semibold tabular-nums">{daysEngaged}</span>
                      <span style={{ color: '#74917B' }} className="text-xs">days engaged</span>
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
                backgroundColor: '#0A1610',
                boxShadow: '0 1px 0 0 #1F3326',
              }}
            >
              <SidebarTrigger />
              <div className="flex flex-1 items-center justify-center gap-4">
                <div className="hidden sm:flex items-center">
                  <div className="flex items-center gap-2 min-w-fit rounded-full px-3 py-1" style={{ backgroundColor: 'rgba(74,222,128,0.12)', boxShadow: '0 0 0 1px rgba(74,222,128,0.3)' }}>
                    <Leaf className="size-3.5" style={{ color: '#4ADE80' }} />
                    <span className="text-xs font-semibold tabular-nums" style={{ color: '#4ADE80' }}>Day {dayInProgram} of 70</span>
                    <span style={{ color: 'rgba(74,222,128,0.4)' }}>|</span>
                    <span className="text-xs font-medium" style={{ color: '#4ADE80' }}>Week {currentWeek}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.push("/notifications")}
                    className="relative size-9 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: '#142219' }}
                    aria-label="Notifications"
                  >
                    <Bell className="size-4" style={{ color: '#B9D0BE' }} />
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 flex items-center justify-center px-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: '#F87171', color: '#F2F7F1' }}>
                      3
                    </span>
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2" aria-label="User menu">
                      <Avatar className="size-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="size-4 hidden sm:block" style={{ color: '#74917B' }} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-64 rounded-2xl border-0 p-0 overflow-hidden z-[100]"
                      style={{ backgroundColor: '#0E1A12', boxShadow: '0 0 0 1px #1F3326, 0 8px 32px rgba(0,0,0,0.6)' }}
                    >
                      <div className="px-4 py-3" style={{ backgroundColor: '#142219' }}>
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="size-10 rounded-full">
                            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: '#F2F7F1' }}>{displayName}</p>
                            <p className="text-xs" style={{ color: '#B9D0BE' }}>Moderate Use Program</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}>
                            Day {dayInProgram}
                          </span>
                          <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: 'rgba(240,180,41,0.15)', color: '#F0B429' }}>
                            <Flame className="size-3 inline mr-0.5" />{daysEngaged} streak
                          </span>
                        </div>
                      </div>
                      <div className="py-1" style={{ backgroundColor: '#0E1A12' }}>
                        <DropdownMenuItem onClick={() => router.push("/profile")} className="text-sm cursor-pointer focus:bg-white/[0.06]" style={{ color: '#B9D0BE' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ backgroundColor: '#142219' }}>
                            <User className="size-3.5" />
                          </span>
                          <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/program")} className="text-sm cursor-pointer focus:bg-white/[0.06]" style={{ color: '#B9D0BE' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ backgroundColor: '#142219' }}>
                            <BookOpen className="size-3.5" />
                          </span>
                          <span>My Program</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/journal")} className="text-sm cursor-pointer focus:bg-white/[0.06]" style={{ color: '#B9D0BE' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ backgroundColor: '#142219' }}>
                            <PenLine className="size-3.5" />
                          </span>
                          <span>Journal</span>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator style={{ backgroundColor: '#1F3326' }} />
                      <div className="py-1" style={{ backgroundColor: '#0E1A12' }}>
                        <DropdownMenuItem onClick={() => router.push("/notifications")} className="text-sm cursor-pointer focus:bg-white/[0.06]" style={{ color: '#B9D0BE' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ backgroundColor: '#142219' }}>
                            <Bell className="size-3.5" />
                          </span>
                          <span>Notifications</span>
                          <span className="ml-auto min-w-4 h-4 flex items-center justify-center px-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: '#F87171', color: '#F2F7F1' }}>3</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/settings")} className="text-sm cursor-pointer focus:bg-white/[0.06]" style={{ color: '#B9D0BE' }}>
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ backgroundColor: '#142219' }}>
                            <Settings className="size-3.5" />
                          </span>
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator style={{ backgroundColor: '#1F3326' }} />
                      <div className="py-1" style={{ backgroundColor: '#0E1A12' }}>
                        <DropdownMenuItem
                          onClick={() => router.push("/")}
                          className="text-sm cursor-pointer focus:bg-[rgba(248,113,113,0.10)]"
                          style={{ color: '#F87171' }}
                        >
                          <span className="flex size-6 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(248,113,113,0.15)' }}>
                            <LogOut className="size-3.5" />
                          </span>
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8" style={{ backgroundColor: '#07100B', color: '#B9D0BE' }}>
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
