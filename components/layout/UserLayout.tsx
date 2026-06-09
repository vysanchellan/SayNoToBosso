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
  Flame,
} from "lucide-react"
import CrisisModal from "@/components/features/dashboard/CrisisModal"
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

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1">
              <svg width="24" height="24" viewBox="0 0 200 50" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M12 38c0-8 6-14 14-14s14 6 14 14" stroke="hsl(var(--sidebar-primary))" strokeWidth="2" strokeLinecap="round"/>
                <path d="M26 10c0 8-4 14-10 14s-10-6-10-14" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round"/>
                <path d="M26 10c0 8 4 14 10 14s10-6 10-14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <text x="48" y="28" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="18" fill="white">CC</text>
              </svg>
              <span className="text-sm font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                CannaClear
              </span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.label}
                        render={<Link href={item.href} />}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
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
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive data-active:bg-destructive/10 data-active:text-destructive"
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
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">Thabo M.</span>
                    <span className="truncate text-xs text-sidebar-foreground/60">Day 14 of Program</span>
                  </div>
                  <span className="ml-auto flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary group-data-[collapsible=icon]:hidden">
                    <Flame className="size-3 text-accent" />
                    14
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
              <SidebarTrigger />
              <div className="flex flex-1 items-center justify-between gap-4">
                <h1 className="text-lg font-semibold text-foreground">
                  {pathname === "/dashboard" ? "Dashboard" : ""}
                </h1>
                <div className="hidden sm:flex items-center">
                  <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary">
                    Day 14 of 70 &mdash; Week 2: Brain Reset
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="relative p-1 text-muted-foreground hover:text-foreground" aria-label="Notifications">
                    <Bell className="size-5" />
                    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                      3
                    </span>
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<button className="flex items-center gap-2" aria-label="User menu" />}>
                      <Avatar className="size-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
                        <AvatarFallback>TM</AvatarFallback>
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
                        <Link href="/login" className="w-full">Sign Out</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
      <CrisisModal />
    </SidebarProvider>
  )
}
