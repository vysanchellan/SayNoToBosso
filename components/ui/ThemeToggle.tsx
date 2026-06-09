"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycle = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  return (
    <button
      onClick={cycle}
      className="relative flex size-9 items-center justify-center rounded-xl border border-muted-foreground/20 text-muted-foreground hover:text-foreground hover:bg-muted transition-all min-h-[44px] min-w-[44px]"
      aria-label={`Current theme: ${theme}. Click to change.`}
    >
      <Sun className="size-4 absolute transition-opacity duration-300 dark:opacity-0" />
      <Moon className="size-4 absolute transition-opacity duration-300 dark:opacity-100 opacity-0" />
    </button>
  )
}
