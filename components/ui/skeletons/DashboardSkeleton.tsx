import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-48 rounded-xl" />
        <Skeleton className="h-12 w-32 rounded-xl" />
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="size-20 rounded-full" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
        ))}
      </div>

      <Skeleton className="h-48 rounded-2xl" />

      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="size-16 rounded-full" />
        ))}
      </div>
    </div>
  )
}
