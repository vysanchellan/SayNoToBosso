"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, ArrowRight, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const bodyScanParts = ["Feet", "Legs", "Abdomen", "Chest", "Arms", "Neck", "Face", "Full Body"]

const bodyScanTexts: Record<string, string> = {
  Feet: "Bring your attention to your feet. Notice any sensations — warmth, coolness, pressure, or tingling. Wiggle your toes gently. Feel the contact between your feet and the ground beneath you.",
  Legs: "Shift your awareness to your legs. Notice the muscles of your calves, your thighs. Are they tense or relaxed? With each exhale, imagine tension releasing from your legs, flowing down into the earth.",
  Abdomen: "Bring your attention to your abdomen. Feel it rise with each inhale, fall with each exhale. Place a hand on your belly if it helps. Notice the gentle rhythm of your breath moving through your core.",
  Chest: "Notice your chest now. Feel your ribs expand with each breathe in, contract as you breathe out. Your heart beats steadily beneath. Feel gratitude for this steady, faithful rhythm.",
  Arms: "Bring awareness to your arms. From shoulders to fingertips, notice any sensation — the weight of your arms, the air on your skin, any tightness in your shoulders. Soften with each exhale.",
  Neck: "Gently bring awareness to your neck and throat. This area often holds tension. Imagine your neck lengthening, your throat softening. Release any clenching with each exhale.",
  Face: "Notice your face. Soften your jaw. Relax your forehead. Release your tongue from the roof of your mouth. Your eyes rest gently in their sockets. Your entire face softens.",
  "Full Body": "Now expand your awareness to include your entire body. Feel your body as a whole — a complete, alive, breathing presence. You are whole. You are here. You are healing.",
}

const affirmations = [
  "I am stronger than my cravings.",
  "Every breath I take is a step toward freedom.",
  "My body is healing, and I am patient with the process.",
  "I deserve a life free from dependence.",
  "This discomfort is temporary; my strength is permanent.",
  "I am not my cravings. I am the awareness behind them.",
  "Each day without cannabis is a victory.",
  "I choose health, clarity, and presence.",
  "My past does not define my future.",
  "I am capable of change, and I am changing every day.",
]

export default function MindfulnessCentre() {
  const [scanStep, setScanStep] = useState(0)
  const [scanning, setScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)

  const [groundStep, setGroundStep] = useState(0)
  const [groundInputs, setGroundInputs] = useState<string[]>(["", "", "", "", ""])
  const [groundComplete, setGroundComplete] = useState(false)

  const [affirmationIndex, setAffirmationIndex] = useState(0)
  const [favourites, setFavourites] = useState<number[]>([])

  const startScan = useCallback(() => {
    setScanning(true)
    setScanStep(0)
    setScanComplete(false)
  }, [])

  const nextScanStep = useCallback(() => {
    if (scanStep < bodyScanParts.length - 1) {
      setScanStep((s) => s + 1)
    } else {
      setScanComplete(true)
    }
  }, [scanStep])

  const groundPrompts = [
    "Name 5 things you can SEE right now",
    "Name 4 things you can TOUCH",
    "Name 3 things you can HEAR",
    "Name 2 things you can SMELL",
    "Name 1 thing you can TASTE",
  ]

  const submitGround = () => {
    setGroundComplete(true)
  }

  const toggleFavourite = (i: number) => {
    setFavourites((prev) => prev.includes(i) ? prev.filter((f) => f !== i) : [...prev, i])
  }

  if (scanComplete) {
    return (
      <div className="rounded-2xl p-8 text-center border" style={{ background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.2), hsl(var(--card)))' }}>
        <div className="flex justify-center mb-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-secondary/20">
            <Sparkles className="size-8 text-secondary" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Body Scan Complete</h3>
        <p className="text-sm text-muted-foreground mb-4">You have scanned through your entire body. You are present. You are healing.</p>
        <Button
          onClick={() => { setScanning(false); setScanComplete(false); setScanStep(0) }}
          variant="outline"
          className="rounded-full"
        >
          Back to Tools
        </Button>
      </div>
    )
  }

  if (scanning) {
    return (
      <div className="rounded-2xl p-6 border" style={{ background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.1), hsl(var(--card)))' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground">
            {scanStep + 1} of {bodyScanParts.length}
          </span>
          <div className="flex gap-1">
            {bodyScanParts.map((_, i) => (
              <div key={i} className={`h-1.5 w-4 rounded-full ${i <= scanStep ? "bg-secondary" : "bg-muted"}`} />
            ))}
          </div>
        </div>
        <div className="text-center py-4">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-secondary/20">
            <span className="text-xl font-bold text-secondary">{bodyScanParts[scanStep]}</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-md mx-auto">
            {bodyScanTexts[bodyScanParts[scanStep]]}
          </p>
        </div>
        <Button onClick={nextScanStep} className="w-full rounded-full bg-secondary text-white hover:bg-secondary/90">
          {scanStep < bodyScanParts.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    )
  }

  if (groundComplete) {
    return (
      <div className="rounded-2xl p-8 text-center border" style={{ background: 'linear-gradient(135deg, hsl(var(--accent) / 0.1), hsl(var(--card)))' }}>
        <h3 className="text-lg font-semibold text-foreground mb-2">Well done. You are present. You are safe.</h3>
        <Button
          onClick={() => { setGroundComplete(false); setGroundStep(0); setGroundInputs(["", "", "", "", ""]) }}
          variant="outline"
          className="rounded-full mt-4"
        >
          Back to Tools
        </Button>
      </div>
    )
  }

  const groundCurrent = groundStep

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-6 shadow-sm" style={{ background: 'hsl(var(--card))' }}>
        <h3 className="text-base font-semibold text-foreground mb-3">Guided Body Scan (5 min)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          A text-based meditation that guides your attention through each part of your body.
        </p>
        <Button onClick={startScan} className="w-full rounded-full bg-secondary text-white hover:bg-secondary/90">
          Begin Body Scan
        </Button>
      </div>

      <div className="rounded-2xl border p-6 shadow-sm" style={{ background: 'hsl(var(--card))' }}>
        <h3 className="text-base font-semibold text-foreground mb-4">Grounding Exercise (5-4-3-2-1)</h3>
        <p className="text-sm text-muted-foreground mb-4">{groundPrompts[groundCurrent]}</p>
        <input
          type="text"
          value={groundInputs[groundCurrent]}
          onChange={(e) => {
            const next = [...groundInputs]
            next[groundCurrent] = e.target.value
            setGroundInputs(next)
          }}
          placeholder="Type your answer here..."
          className="w-full rounded-xl border px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
        />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (groundCurrent < 4) setGroundStep(groundCurrent + 1)
              else submitGround()
            }}
            disabled={!groundInputs[groundCurrent].trim()}
            className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {groundCurrent < 4 ? "Next" : "Complete"}
          </Button>
          {groundCurrent > 0 && (
            <Button
              onClick={() => setGroundStep(groundCurrent - 1)}
              variant="outline"
              className="rounded-full"
            >
              Back
            </Button>
          )}
        </div>
        <div className="flex gap-1.5 mt-4 justify-center">
          {groundPrompts.map((_, i) => (
            <div key={i} className={`h-1.5 w-4 rounded-full ${i <= groundCurrent ? "bg-accent" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border p-6 shadow-sm" style={{ background: 'hsl(var(--card))' }}>
        <h3 className="text-base font-semibold text-foreground mb-4">Affirmations</h3>
        <div className="rounded-xl bg-primary/5 p-8 text-center border border-primary/10">
          <p className="text-xl font-semibold text-foreground leading-relaxed">
            &ldquo;{affirmations[affirmationIndex]}&rdquo;
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setAffirmationIndex((i) => (i - 1 + affirmations.length) % affirmations.length)}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Previous affirmation"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            onClick={() => toggleFavourite(affirmationIndex)}
            className={`p-2 transition-colors ${favourites.includes(affirmationIndex) ? "text-red-500" : "text-muted-foreground hover:text-red-400"}`}
            aria-label={favourites.includes(affirmationIndex) ? "Remove from favourites" : "Save as favourite"}
          >
            <Heart className={`size-5 ${favourites.includes(affirmationIndex) ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={() => setAffirmationIndex((i) => (i + 1) % affirmations.length)}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Next affirmation"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
        <div className="flex gap-1.5 mt-3 justify-center">
          {affirmations.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === affirmationIndex ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/20"}`}
            />
          ))}
        </div>

        {favourites.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Saved Favourites</p>
            <div className="space-y-2">
              {favourites.map((i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2">
                  <p className="text-sm text-foreground">{affirmations[i]}</p>
                  <button onClick={() => toggleFavourite(i)} className="text-red-400 hover:text-red-500 shrink-0 ml-2">
                    <Heart className="size-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
