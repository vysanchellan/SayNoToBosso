import ProgramWeekSkeleton from "@/components/ui/skeletons/ProgramWeekSkeleton"

export default function ProgramLoading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 rounded-xl bg-muted animate-pulse" />
      <ProgramWeekSkeleton />
      <ProgramWeekSkeleton />
      <ProgramWeekSkeleton />
    </div>
  )
}
