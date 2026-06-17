"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, Wrench, PenLine, MoreHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FlaskConical, Users, UserCircle, HeartPulse } from "lucide-react"

const mainTabs = [
  { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Program", icon: BookOpen, href: "/program" },
  { label: "Tools", icon: Wrench, href: "/tools" },
  { label: "Journal", icon: PenLine, href: "/journal" },
  { label: "More", icon: MoreHorizontal, href: "#more" },
]

const moreItems = [
  { label: "Research", icon: FlaskConical, href: "/research" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "Profile", icon: UserCircle, href: "/profile" },
  { label: "Crisis Support", icon: HeartPulse, href: "#crisis", crisis: true },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "#more") return false
    return pathname === href
  }

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t bg-card lg:hidden pb-safe"
        style={{ borderColor: '#1F3326', boxShadow: '0 -1px 0 0 #1F3326, 0 -4px 16px rgba(8,17,12,0.4)' }}
        aria-label="Mobile navigation"
      >
        {mainTabs.map((tab) => {
          const active = isActive(tab.href)

          if (tab.href === "#more") {
            return (
              <Sheet key="more" open={moreOpen} onOpenChange={setMoreOpen}>
                <SheetTrigger render={
                  <button
                    className="flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px]"
                    aria-label="More options"
                  />
                }>
                  <div className="relative">
                    <MoreHorizontal className="size-5 text-muted-foreground" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">More</span>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl pb-8 bg-card border-t" style={{ borderColor: '#1F3326' }}>
                  <SheetHeader>
                    <SheetTitle className="text-center text-sm text-foreground">More Options</SheetTitle>
                  </SheetHeader>
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {moreItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (item.crisis) {
                            window.__openCrisisModal?.()
                            setMoreOpen(false)
                          }
                        }}
                        className={`flex flex-col items-center gap-2 rounded-xl p-4 min-h-[44px] min-w-[44px] transition-colors bg-muted/30 ${
                          item.crisis ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon className="size-5" />
                        <span className="text-xs font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            )
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px]"
            >
              <tab.icon className={`size-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
              {active && <span className="size-1 rounded-full bg-primary" />}
              <span className={`text-[10px] ${active ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </nav>
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </>
  )
}
