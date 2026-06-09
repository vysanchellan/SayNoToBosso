"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, StopCircle, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

type Phase = "inhale" | "hold" | "exhale"
type PhaseDef = { phase: Phase; duration: number }

type Exercise = {
  name: string
  desc: string
  phases: PhaseDef[]
  totalRounds: number
}

const exercises: Exercise[] = [
  {
    name: "4-7-8 Relaxation",
    desc: "For anxiety and sleep",
    phases: [
      { phase: "inhale", duration: 4 },
      { phase: "hold", duration: 7 },
      { phase: "exhale", duration: 8 },
    ],
    totalRounds: 5,
  },
  {
    name: "Box Breathing",
    desc: "For focus and calm",
    phases: [
      { phase: "inhale", duration: 4 },
      { phase: "hold", duration: 4 },
      { phase: "exhale", duration: 4 },
      { phase: "hold", duration: 4 },
    ],
    totalRounds: 5,
  },
  {
    name: "5-5 Calm Breath",
    desc: "For beginners",
    phases: [
      { phase: "inhale", duration: 5 },
      { phase: "exhale", duration: 5 },
    ],
    totalRounds: 5,
  },
]

const phaseColor: Record<Phase, { from: string; to: string }> = {
  inhale: { from: "#9fcfb6", to: "#1A5C3A" },
  hold: { from: "#1A5C3A", to: "#1A5C3A" },
  exhale: { from: "#1A5C3A", to: "#9fcfb6" },
}

function playBeepSound(soundOn: boolean) {
  if (!soundOn) return
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 520
    gain.gain.value = 0.15
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc.start()
    osc.stop(ctx.currentTime + 0.3)
    setTimeout(() => ctx.close(), 500)
  } catch { /* audio not available */ }
}

export default function BreathingTool() {
  const [selected, setSelected] = useState<Exercise | null>(null)
  const [state, setState] = useState<"idle" | "active" | "paused" | "complete">("idle")
  const [round, setRound] = useState(1)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [progress, setProgress] = useState(0)
  const [soundOn, setSoundOn] = useState(true)
  const [elapsed, setElapsed] = useState(0)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animRef = useRef<number | null>(null)

  const runTimer = (duration: number) => {
    let c = duration
    timerRef.current = setInterval(() => {
      c -= 0.05
      setCountdown(Math.ceil(c))
      setProgress(1 - c / duration)
      if (c <= 0) {
        clearInterval(timerRef.current!)
        advance()
      }
    }, 50)
  }

  const advance = () => {
    const ex = selected
    if (!ex) return
    const nextPi = phaseIndex + 1
    if (nextPi >= ex.phases.length) {
      if (round >= ex.totalRounds) {
        setState("complete")
        return
      }
      setRound((r) => r + 1)
      setPhaseIndex(0)
      const p = ex.phases[0]
      setCountdown(p.duration)
      setProgress(0)
      playBeepSound(soundOn)
      runTimer(p.duration)
    } else {
      setPhaseIndex(nextPi)
      const p = ex.phases[nextPi]
      setCountdown(p.duration)
      setProgress(0)
      playBeepSound(soundOn)
      runTimer(p.duration)
    }
  }

  const startExercise = () => {
    if (!selected) return
    setState("active")
    setRound(1)
    setPhaseIndex(0)
    setElapsed(0)
    startTimeRef.current = Date.now()

    const firstPhase = selected.phases[0]
    setCountdown(firstPhase.duration)
    setProgress(0)
    playBeepSound(soundOn)
    runTimer(firstPhase.duration)

    animRef.current = window.setInterval(() => {
      setElapsed((e) => e + 0.1)
    }, 100)
  }

  const startTimeRef = useRef(0)

  const pause = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (animRef.current) clearInterval(animRef.current)
    setState("paused")
  }

  const resume = () => {
    if (!selected) return
    setState("active")
    runTimer(countdown)
    animRef.current = window.setInterval(() => {
      setElapsed((e) => e + 0.1)
    }, 100)
  }

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (animRef.current) clearInterval(animRef.current)
    setState("idle")
    setRound(1)
    setPhaseIndex(0)
    setCountdown(0)
    setProgress(0)
    setElapsed(0)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (animRef.current) clearInterval(animRef.current)
    }
  }, [])

  const phase = selected?.phases[phaseIndex]
  const scale = phase
    ? phase.phase === "inhale"
      ? 0.6 + progress * 0.4
      : phase.phase === "exhale"
        ? 1.0 - progress * 0.4
        : 1.0
    : 1

  const cc = phase ? phaseColor[phase.phase] : { from: "#9fcfb6", to: "#1A5C3A" }
  const opacity = phase?.phase === "hold" ? 0.8 + progress * 0.2 : 1

  if (state === "complete") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-green-900 to-primary p-8 text-white min-h-[400px]">
        <div className="flex size-16 items-center justify-center rounded-full bg-white/20 mb-4">
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Session Complete</h3>
        <p className="text-white/70 mb-6">Duration: {elapsed.toFixed(0)}s</p>
        <Button
          onClick={() => { setState("idle"); setSelected(null) }}
          className="rounded-full bg-white text-primary hover:bg-white/90"
        >
          Log Complete
        </Button>
      </div>
    )
  }

  if (!selected) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Select an exercise to begin your breathing session.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {exercises.map((ex) => (
            <button
              key={ex.name}
              onClick={() => setSelected(ex)}
              className="rounded-2xl border bg-white p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <h4 className="text-sm font-semibold text-foreground">{ex.name}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{ex.desc}</p>
              <div className="mt-3 flex gap-1">
                {ex.phases.map((p, i) => (
                  <span key={i} className={`h-1.5 flex-1 rounded-full ${p.phase === "inhale" ? "bg-primary" : p.phase === "hold" ? "bg-accent" : "bg-secondary"}`} />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-green-900 to-primary p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{selected.name}</h3>
          <p className="text-sm text-white/60">
            Round {round} of {selected.totalRounds}
          </p>
        </div>
        <button
          onClick={() => setSoundOn(!soundOn)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20"
          aria-label={soundOn ? "Mute sounds" : "Enable sounds"}
        >
          {soundOn ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
        </button>
      </div>

      <div className="flex justify-center py-8">
        <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
          <svg width="300" height="300" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
            <circle
              cx="150" cy="150" r="120"
              fill="none"
              stroke={phase ? phaseColor[phase.phase].to : "#1A5C3A"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress)}
              transform="rotate(-90 150 150)"
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
          </svg>
          <div
            className="absolute flex flex-col items-center justify-center rounded-full transition-all duration-100"
            style={{
              width: 240 * scale,
              height: 240 * scale,
              backgroundColor: `color-mix(in srgb, ${cc.from}, ${cc.to} ${progress * 100}%)`,
              opacity,
              borderRadius: "50%",
            }}
          >
            <span className="text-2xl font-bold text-white drop-shadow-sm">
              {phase?.phase.toUpperCase()}
            </span>
            <span className="text-4xl font-bold text-white drop-shadow-sm mt-1">
              {countdown}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {state === "idle" ? (
          <Button onClick={startExercise} className="rounded-full bg-white text-primary hover:bg-white/90">
            <Play className="size-4 mr-2" /> Start
          </Button>
        ) : state === "paused" ? (
          <Button onClick={resume} className="rounded-full bg-white text-primary hover:bg-white/90">
            <Play className="size-4 mr-2" /> Resume
          </Button>
        ) : (
          <Button onClick={pause} className="rounded-full bg-white/20 text-white hover:bg-white/30 border border-white/30">
            <Pause className="size-4 mr-2" /> Pause
          </Button>
        )}
        {state !== "idle" && (
          <Button onClick={stop} variant="ghost" className="text-white/60 hover:text-white">
            <StopCircle className="size-4 mr-2" /> Stop
          </Button>
        )}
      </div>
    </div>
  )
}
