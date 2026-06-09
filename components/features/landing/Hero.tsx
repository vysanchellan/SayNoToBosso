"use client"

import { motion } from "framer-motion"
import { Leaf, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const stats = [
  { value: "87%", label: "Report better sleep by Week 2" },
  { value: "94%", label: "Reduced cravings by Week 4" },
  { value: "3.2×", label: "More likely to maintain sobriety" },
  { value: "16 Weeks", label: "Average full program length" },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a1f14 0%, #1a3d28 50%, #0f2d1e 100%)",
      }}
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cpath d='M200 50C250 50 300 80 320 130C340 180 330 240 290 280C250 320 190 340 140 320C90 300 60 250 50 200C40 150 60 100 100 70C140 40 170 50 200 50Z' fill='white' opacity='0.04'/%3E%3Cpath d='M50 350C100 320 150 330 180 370C210 410 180 450 130 460C80 470 30 440 20 400C10 360 30 350 50 350Z' fill='white' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80"
            >
              <Award className="size-4 text-amber-400" />
              <span>Developed with Clinical Professionals</span>
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <span className="block text-4xl font-light tracking-tight text-white/90 sm:text-5xl lg:text-6xl">
                Your Journey to
              </span>
              <span className="block text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Cannabis-Free Living
              </span>
              <span className="block text-4xl font-light tracking-tight text-white/90 sm:text-5xl lg:text-6xl">
                Starts Here
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="max-w-lg text-lg text-white/70 sm:text-xl"
            >
              A clinically guided, week-by-week recovery program built for real people. Sleep better, think clearer, feel whole again.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              <Link href="/register">
                <Button
                  size="lg"
                  className="rounded-full bg-amber-500 text-amber-950 hover:bg-amber-400 px-8 py-3 text-base font-semibold"
                >
                  Begin My Recovery
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="ghost"
                  className="rounded-full border border-white/20 text-white hover:bg-white/10 px-8 py-3 text-base"
                >
                  How It Works
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-full bg-primary/30 p-2">
                  <Leaf className="size-5 text-green-300" />
                </div>
                <span className="text-sm font-semibold text-white/90">
                  Recovery Outcomes at a Glance
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                    className="rounded-xl bg-white/10 p-4"
                  >
                    <div className="text-2xl font-bold text-amber-300 sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs text-white/60 leading-tight">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">Program Completion Rate</span>
                  <span className="font-semibold text-white">91%</span>
                </div>
                <Progress
                  value={91}
                  className="[&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-green-400 [&_[data-slot=progress-indicator]]:to-amber-400"
                >
                  <div className="sr-only">Program completion rate: 91%</div>
                </Progress>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
                  <span className="size-1.5 rounded-full bg-green-400" />
                  POPIA Compliant
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                  Clinically Reviewed
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                  SA-Based
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
