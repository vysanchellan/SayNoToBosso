"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const DARK_ONLY_PREFIXES = ["/dashboard", "/program", "/tools", "/journal", "/research", "/community", "/profile", "/admin"]

export function ForceDarkMode() {
  const pathname = usePathname()
  useEffect(() => {
    const isAppRoute = DARK_ONLY_PREFIXES.some(p => pathname?.startsWith(p))
    if (isAppRoute) {
      document.documentElement.classList.add("dark")
    }
  }, [pathname])
  return null
}
