import Link from "next/link"
import { Button } from "@/components/ui/button"
import BotanicalBackground from "@/components/ui/BotanicalBackground"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#1E2A3A] text-center">
      <BotanicalBackground mode="dark" />
      <div className="relative z-10">
        <h1 className="text-8xl font-bold text-white/20">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-white">This page doesn&apos;t exist</h2>
        <p className="mt-2 text-sm text-white/60 max-w-sm">
          The page you&apos;re looking for may have been moved or deleted.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Return to Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button className="rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
