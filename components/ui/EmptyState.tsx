import Link from "next/link"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  illustration: "journal" | "community" | "badges" | "search" | "notifications"
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
}

function Illo({ type }: { type: string }) {
  const green = "#1A5C3A"
  const sage = "#6B9E78"
  const amber = "#D4A017"
  const muted = "#8A8A8A"

  switch (type) {
    case "journal":
      return (
        <svg height="120" viewBox="0 0 120 120" aria-hidden="true">
          <rect x="25" y="15" width="70" height="90" rx="4" fill="none" stroke={green} strokeWidth="1.5" />
          <line x1="35" y1="35" x2="85" y2="35" stroke={green} strokeWidth="1" />
          <line x1="35" y1="50" x2="75" y2="50" stroke={sage} strokeWidth="1" />
          <line x1="35" y1="65" x2="80" y2="65" stroke={sage} strokeWidth="1" />
          <path d="M75 30 L85 20 L90 25 L80 35Z" fill={sage} />
          <path d="M55 85 C55 85 40 95 30 90 C25 88 28 82 35 80 C42 78 55 85 55 85Z" fill="none" stroke={sage} strokeWidth="1.5" />
        </svg>
      )
    case "community":
      return (
        <svg height="120" viewBox="0 0 120 120" aria-hidden="true">
          <path d="M30 70 Q30 40 50 40 L70 40 Q90 40 90 55 Q90 70 80 75 L85 90 L70 80 Q50 80 30 70Z" fill="none" stroke={sage} strokeWidth="1.5" />
          <path d="M80 50 Q90 25 105 30 Q115 35 110 45 Q105 55 95 55 L90 65 L80 60Z" fill="none" stroke={green} strokeWidth="1.5" />
          <path d="M50 65 C50 65 45 70 48 73 C51 76 56 72 56 72" fill="none" stroke="#E05C4B" strokeWidth="1.5" />
        </svg>
      )
    case "badges":
      return (
        <svg height="120" viewBox="0 0 120 120" aria-hidden="true">
          <path d="M60 15 L68 40 L95 40 L73 56 L80 82 L60 66 L40 82 L47 56 L25 40 L52 40Z" fill="none" stroke={amber} strokeWidth="1.5" />
          <text x="60" y="52" textAnchor="middle" fontSize="16" fill={amber} fontWeight="bold">?</text>
          <circle cx="20" cy="25" r="4" fill="none" stroke={amber} strokeWidth="1" />
          <circle cx="100" cy="20" r="3" fill="none" stroke={amber} strokeWidth="1" />
          <circle cx="110" cy="55" r="2.5" fill="none" stroke={amber} strokeWidth="1" />
          <circle cx="10" cy="60" r="3" fill="none" stroke={amber} strokeWidth="1" />
          <circle cx="35" cy="100" r="2" fill="none" stroke={amber} strokeWidth="1" />
        </svg>
      )
    case "search":
      return (
        <svg height="100" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="38" cy="38" r="22" fill="none" stroke={green} strokeWidth="2" />
          <line x1="54" y1="54" x2="72" y2="72" stroke={green} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 38 Q38 32 44 38" fill="none" stroke={sage} strokeWidth="1.5" />
          <path d="M36 36 L38 34 L40 36" fill="none" stroke={sage} strokeWidth="1" />
        </svg>
      )
    case "notifications":
      return (
        <svg height="100" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M30 45 Q30 28 50 25 Q70 28 70 45 L75 60 Q76 65 72 67 L28 67 Q24 65 25 60Z" fill="none" stroke={muted} strokeWidth="1.5" />
          <circle cx="50" cy="20" r="3" fill="none" stroke={muted} strokeWidth="1" />
          <line x1="50" y1="72" x2="50" y2="76" stroke={muted} strokeWidth="1.5" />
          <text x="60" y="50" fontSize="9" fill={muted} fontFamily="serif" fontStyle="italic">z z z</text>
        </svg>
      )
    default:
      return null
  }
}

export default function EmptyState({ illustration, title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Illo type={illustration} />
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
      {ctaLabel && ctaHref && (
        <Link href={ctaHref}>
          <Button className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            {ctaLabel}
          </Button>
        </Link>
      )}
    </div>
  )
}
