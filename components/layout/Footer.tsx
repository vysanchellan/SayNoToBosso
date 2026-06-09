import Link from "next/link"
import { APP_NAME, APP_TAGLINE } from "@/lib/constants"

const linkSections = [
  {
    title: "Links",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Program Overview", href: "/program" },
      { label: "Research", href: "#research" },
      { label: "For Clinics", href: "#for-clinics" },
      { label: "Sign In", href: "/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "POPIA Compliance Statement", href: "/popia" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 200 50" fill="none" className="h-6 w-auto" aria-hidden="true">
                <path d="M12 38c0-8 6-14 14-14s14 6 14 14" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round"/>
                <path d="M26 10c0 8-4 14-10 14s-10-6-10-14" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round"/>
                <path d="M26 10c0 8 4 14 10 14s10-6 10-14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <text x="58" y="32" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="28" fill="white">{APP_NAME}</text>
              </svg>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-xs">{APP_TAGLINE}</p>
            <p className="text-xs text-primary-foreground/50">
              &copy; 2025 {APP_NAME}. All rights reserved.
            </p>
          </div>

          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4 text-primary-foreground/90">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-xs text-primary-foreground/50">
            This application is not a substitute for professional medical advice. Always consult your healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  )
}
