# CannaClear

**Your guided path to cannabis-free living.**

A clinically warm cannabis recovery platform designed for South African rehabilitation centres. Built with Next.js 15, Tailwind v4, shadcn/ui Base UI, and deployed on Vercel.

## Features

- **Landing Page** — Brand introduction with clinic CTA, testimonial carousel, POPIA consent banner
- **Authentication** — Email/password login, registration, onboarding wizard (2-step)
- **User Dashboard** — Streak counter, daily check-in, goals, progress rings, weekly program card, milestones, quick tools, crisis modal
- **My Program** — 10-week moderate tier, activity rows, collapsible week cards, lesson viewer with quiz, journal prompts
- **Daily Tools** — Breathing tool (animated + Web Audio), sleep tracker, hydration tracker, nutrition guide, movement log, mindfulness centre
- **Journal & Research** — Editor with auto-save, 12-article grid, FAQ accordion
- **Milestones & Community** — 24 badges with celebration, post feed with reactions, composer
- **User Profile** — Stats + mood chart, achievements, settings, privacy (POPIA rights)
- **Admin Panel** — KPI cards, mood/craving chart, donut/bar charts, user table with filters, reports (PDF), program manager, community moderation, alert flags
- **Demo Mode** — One-click preview as user or admin with fully simulated data
- **Dark Mode** — Light/dark/system toggle with `next-themes`
- **Mobile** — Fixed bottom tab bar, touch targets ≥ 44×44px
- **Accessibility** — WCAG 2.2 AA, keyboard nav, skip link, reduced motion, print styles

## Tech Stack

- **Framework:** Next.js 15 (App Router, React Compiler)
- **Styling:** Tailwind CSS v4, CSS variables (HSL)
- **UI:** shadcn/ui Base UI
- **State:** Zustand + React Context
- **Forms:** react-hook-form + zod
- **Charts:** Recharts
- **Animations:** framer-motion
- **Notifications:** Sonner
- **Auth:** bcryptjs
- **Font:** Inter

## Getting Started

```bash
git clone <repo-url>
cd cannaclear
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Deployment

See [DEPLOY.md](./DEPLOY.md) for Vercel deployment instructions.
