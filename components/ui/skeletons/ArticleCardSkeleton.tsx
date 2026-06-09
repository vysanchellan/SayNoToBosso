import { Skeleton } from "@/components/ui/skeleton"

export default function ArticleCardSkeleton({ cols = 3 }: { cols?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="rounded-2xl border bg-white overflow-hidden">
          <Skeleton className="h-40 w-full rounded-none" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
