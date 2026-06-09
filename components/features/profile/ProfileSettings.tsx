"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { toast } from "sonner"

export default function ProfileSettings() {
  const [name, setName] = useState("Jordan")
  const [reminders, setReminders] = useState({
    daily: true,
    weekly: true,
    milestone: true,
    community: false,
  })
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    toast.success("Settings updated")
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="rounded-2xl border bg-white p-4 space-y-4">
        <h3 className="text-sm font-semibold">Display Name</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-muted-foreground/20 bg-white p-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="rounded-2xl border bg-white p-4 space-y-4">
        <h3 className="text-sm font-semibold">Notification Preferences</h3>
        {[
          { key: "daily", label: "Daily check-in reminder", time: true },
          { key: "weekly", label: "Weekly program reminder", time: false },
          { key: "milestone", label: "Milestone celebrations", time: false },
          { key: "community", label: "Community activity", time: false },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={reminders[item.key as keyof typeof reminders]}
                onChange={(e) => setReminders((p) => ({ ...p, [item.key]: e.target.checked }))}
                className="rounded border-muted-foreground/30 text-primary focus:ring-primary/30"
              />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            {item.time && (
              <input
                type="time"
                defaultValue="08:00"
                className="rounded-lg border border-muted-foreground/20 bg-white p-1 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-white p-4 space-y-4">
        <h3 className="text-sm font-semibold">Appearance</h3>
        <div className="flex gap-3">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors ${
                theme === t ? "border-primary bg-primary/5 text-primary" : "border-muted-foreground/20 text-muted-foreground hover:border-muted-foreground/40"
              }`}
            >
              {t === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {t === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 space-y-4">
        <h3 className="text-sm font-semibold">Language</h3>
        <select className="w-full rounded-xl border border-muted-foreground/20 bg-white p-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option>English</option>
        </select>
      </div>

      <Button
        onClick={handleSave}
        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {saved ? "Saved!" : "Save Changes"}
      </Button>
    </div>
  )
}
