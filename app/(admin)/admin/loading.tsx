export default function AdminLoading() {
  return (
    <div className="space-y-4 p-4">
      <div className="h-8 w-56 rounded-xl bg-muted animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
      <div className="h-80 rounded-2xl bg-muted animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-64 rounded-2xl bg-muted animate-pulse" />
        <div className="h-64 rounded-2xl bg-muted animate-pulse" />
      </div>
    </div>
  )
}
