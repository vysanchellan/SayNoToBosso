import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16"
      style={{
        background: "linear-gradient(135deg, #0a1f14 0%, #1a3d28 60%, #0f2d1e 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cpath d='M200 50C250 50 300 80 320 130C340 180 330 240 290 280C250 320 190 340 140 320C90 300 60 250 50 200C40 150 60 100 100 70C140 40 170 50 200 50Z' fill='white' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-3">
          <svg width="160" height="40" viewBox="0 0 200 50" fill="none" aria-hidden="true">
            <path d="M12 38c0-8 6-14 14-14s14 6 14 14" stroke="#6B9E78" strokeWidth="2" strokeLinecap="round"/>
            <path d="M26 10c0 8-4 14-10 14s-10-6-10-14" stroke="#D4A017" strokeWidth="2" strokeLinecap="round"/>
            <path d="M26 10c0 8 4 14 10 14s10-6 10-14" fill="white" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>
            <text x="58" y="32" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="22" fill="white">CannaClear</text>
          </svg>
        </div>

        {children}
      </div>

      <p className="relative mt-8 text-xs text-white/40">
        &copy; 2025 CannaClear &mdash; POPIA Compliant
      </p>
    </div>
  )
}
