"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ThemeToggle from "@/components/ui/ThemeToggle"

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Program", href: "#program" },
  { label: "Research", href: "#research" },
  { label: "For Clinics", href: "#for-clinics" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{
        background: scrolled
          ? 'hsl(var(--background) / 0.82)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="CannaClear home">
          <svg width="28" height="28" viewBox="0 0 200 50" fill="none" className="h-7 w-auto" aria-hidden="true">
            <path d="M12 38c0-8 6-14 14-14s14 6 14 14" stroke="hsl(155,55%,16%)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M26 10c0 8-4 14-10 14s-10-6-10-14" stroke="hsl(145,28%,48%)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M26 10c0 8 4 14 10 14s10-6 10-14" stroke="hsl(38,85%,48%)" strokeWidth="2" strokeLinecap="round"/>
            <text x="58" y="32" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="28" fill="hsl(155,55%,16%)">CannaClear</text>
          </svg>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: scrolled ? 'hsl(var(--text-primary))' : 'hsla(0,0%,100%,0.85)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" style={{ color: scrolled ? 'hsl(var(--text-primary))' : 'hsla(0,0%,100%,0.85)' }}>Sign In</Button>
          </Link>
          <Link href="/register">
            <Button
              className="rounded-full font-semibold"
              style={{
                background: 'linear-gradient(135deg, hsl(155,55%,16%) 0%, hsl(155,48%,22%) 100%)',
                color: 'hsl(0,0%,98%)',
              }}
            >
              Get Started
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          style={{ color: scrolled ? 'hsl(var(--text-primary))' : 'white' }}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t" style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--background) / 0.98)' }}>
          <nav className="flex flex-col px-4 py-4 gap-3" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2"
                style={{ color: 'hsl(var(--text-primary))' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
              <Link href="/login">
                <Button variant="ghost" className="w-full justify-center">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button
                  className="w-full justify-center rounded-full font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, hsl(155,55%,16%) 0%, hsl(155,48%,22%) 100%)',
                    color: 'hsl(0,0%,98%)',
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
