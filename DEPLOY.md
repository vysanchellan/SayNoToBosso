# DEPLOY.md — CannaClear Deployment Guide

## Prerequisites

- Node.js 18+ (recommended 20.x)
- npm 9+
- A Vercel account (https://vercel.com)

## Local Build

```bash
npm run build
```

Verify no errors. All routes must compile successfully (22 static pages).

## Environment Variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL` — public URL of your deployment

## Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Option B: Vercel Dashboard

1. Push repo to GitHub/GitLab
2. Go to https://vercel.com/new
3. Import repository
4. Set framework preset to **Next.js**
5. Add environment variables
6. Deploy

## Post-Deployment

- Verify all pages render at your production URL
- Test demo mode by clicking "Try Demo" on the landing page
- Test admin panel at `/admin`
- Test 404 page by navigating to a non-existent route

## Notes

- All user/admin data in demo mode is simulated (no real data exposed)
- POPIA consent banner appears on first visit
- No real PII is stored without explicit consent
- Dark mode persists via `next-themes` class strategy
