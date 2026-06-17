"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div id="main-content" className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full" style={{ background: 'hsl(var(--destructive)/0.15)' }}>
        <AlertTriangle className="size-8" style={{ color: 'hsl(8 65% 68%)' }} />
      </div>
      <h2 className="mt-4 text-xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        We couldn&apos;t load your dashboard. Please try again.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <RefreshCw className="size-4 mr-1.5" />
          Try Again
        </Button>
        <Button onClick={() => router.push("/")} variant="outline" className="rounded-full">
          Go Home
        </Button>
      </div>
    </div>
  )
}
