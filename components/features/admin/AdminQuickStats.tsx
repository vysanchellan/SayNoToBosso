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
        <div key={s.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
          <p className="text-lg font-bold" style={{ color: '#4ADE80' }}>{s.value}</p>
          <p className="text-[10px] mt-0.5" style={{ color: '#74917B' }}>{s.label}</p>
        </div>
      ))}
    </div>
  )
}
