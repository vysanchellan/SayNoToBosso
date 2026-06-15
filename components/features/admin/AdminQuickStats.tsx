export default function AdminQuickStats() {
  const stats = [
    { label: "Breathing sessions today", value: "28" },
    { label: "Journal entries this week", value: "94" },
    { label: "Hydration goal hit", value: "61% of users" },
    { label: "Community posts pending", value: "5" },
    { label: "Average sleep logged", value: "6.8 hrs" },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border bg-card p-3 text-center">
          <p className="text-lg font-bold text-primary">{s.value}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
