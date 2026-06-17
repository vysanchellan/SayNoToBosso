import { Shield, Users, Bell, Database, Palette } from "lucide-react"

export default function AdminSettingsPage() {
  const categories = [
    { icon: Shield, label: "General Settings", desc: "Facility name, timezone, language" },
    { icon: Users, label: "Staff Management", desc: "Add, remove, and manage admin staff" },
    { icon: Bell, label: "Notifications", desc: "Configure alert thresholds and notification channels" },
    { icon: Database, label: "Data Management", desc: "Export, backup, and data retention settings" },
    { icon: Palette, label: "Branding", desc: "Custom logos, colours, and facility branding" },
  ]

  return (
    <div id="main-content" className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Admin settings coming in production</p>
      </div>

      <div className="rounded-2xl p-4" style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.25)' }}>
        <p className="text-sm font-medium" style={{ color: '#F0B429' }}>Admin settings are not editable in the demo version.</p>
        <p className="text-xs mt-1" style={{ color: '#C8951F' }}>Full configuration will be available in the production release.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.label} className="rounded-2xl border bg-card p-4 flex items-start gap-3 opacity-60 cursor-not-allowed">
            <div className="size-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <cat.icon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{cat.label}</p>
              <p className="text-xs text-muted-foreground/60">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
