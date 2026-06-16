"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const toggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      onClick={toggle}
      className="relative flex items-center w-16 h-8 rounded-full border bg-muted dark:bg-sidebar-accent border-border dark:border-sidebar-border transition-colors duration-150 shrink-0"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center size-5 z-10">
        <Sun className={`size-3.5 transition-colors ${isDark ? "text-muted-foreground" : "text-primary-foreground"}`} />
      </span>
      <span className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center size-5 z-10">
        <Moon className={`size-3.5 transition-colors ${isDark ? "text-amber-400" : "text-muted-foreground"}`} />
      </span>
      <span
        className={`absolute top-0.5 size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm transition-transform duration-200 ${
          isDark ? "translate-x-8" : "translate-x-0.5"
        }`}
      >
        {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
      </span>
    </button>
  )
}
