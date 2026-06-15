"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Pause, StopCircle, Volume2, VolumeX } from "lucide-react"
import { toast } from "sonner"
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

function playBeep(soundOn: boolean) {
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
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const roundRef = useRef(round)
  const phaseRef = useRef(phaseIndex)
  const soundRef = useRef(soundOn)

  useEffect(() => { roundRef.current = round }, [round])
  useEffect(() => { phaseRef.current = phaseIndex }, [phaseIndex])
  useEffect(() => { soundRef.current = soundOn }, [soundOn])

  const clearTimers = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    if (animRef.current) { clearInterval(animRef.current); animRef.current = null }
  }, [])

  const advance = useCallback(() => {
    const ex = selected
    if (!ex) return
    const nextPi = phaseRef.current + 1
    if (nextPi >= ex.phases.length) {
      if (roundRef.current >= ex.totalRounds) {
        setState("complete")
        toast.success("Session complete. That's this week's 🌿")
        return
      }
      setRound((r) => { const nr = r + 1; roundRef.current = nr; return nr })
      setPhaseIndex(0)
      phaseRef.current = 0
      const p = ex.phases[0]
      setCountdown(p.duration)
      setProgress(0)
      playBeep(soundRef.current)
      runTimerFunc(p.duration)
    } else {
      setPhaseIndex(nextPi)
      phaseRef.current = nextPi
      const p = ex.phases[nextPi]
      setCountdown(p.duration)
      setProgress(0)
      playBeep(soundRef.current)
      runTimerFunc(p.duration)
    }
  }, [selected])

  const runTimerFunc = useCallback((duration: number) => {
    let c = duration
    timerRef.current = setInterval(() => {
      c -= 0.05
      setCountdown(Math.ceil(c))
      setProgress(1 - c / duration)
      if (c <= 0) {
        if (timerRef.current) clearInterval(timerRef.current)
        advance()
      }
    }, 50)
  }, [advance])

  const startExercise = useCallback(() => {
    if (!selected) return
    setState("active")
    setRound(1)
    roundRef.current = 1
    setPhaseIndex(0)
    phaseRef.current = 0
    setElapsed(0)

    const firstPhase = selected.phases[0]
    setCountdown(firstPhase.duration)
    setProgress(0)
    playBeep(soundRef.current)
    runTimerFunc(firstPhase.duration)

    animRef.current = setInterval(() => {
      setElapsed((e) => e + 0.1)
    }, 100)
  }, [selected, runTimerFunc])

  const pause = useCallback(() => {
    clearTimers()
    setState("paused")
  }, [clearTimers])

  const resume = useCallback(() => {
    setState("active")
    if (!selected) return
    runTimerFunc(countdown)
    animRef.current = setInterval(() => {
      setElapsed((e) => e + 0.1)
    }, 100)
  }, [selected, countdown, runTimerFunc])

  const stop = useCallback(() => {
    clearTimers()
    setState("idle")
    setRound(1)
    roundRef.current = 1
    setPhaseIndex(0)
    phaseRef.current = 0
    setCountdown(0)
    setProgress(0)
    setElapsed(0)
  }, [clearTimers])

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

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
      <div className="flex flex-col items-center justify-center rounded-2xl p-8 min-h-[400px] text-white" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--forest-mid)))' }}>
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
              className="rounded-2xl border bg-card p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              <h4 className="text-sm font-semibold" style={{ color: 'hsl(var(--forest))' }}>{ex.name}</h4>
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
    <div className="rounded-2xl p-8 text-white" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--forest-mid)))' }}>
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
