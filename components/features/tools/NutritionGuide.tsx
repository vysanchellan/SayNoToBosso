"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Leaf, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const accordionItems = [
  {
    title: "Brain Foods",
    body: "Omega-3s (oily fish, walnuts, flaxseed) help repair the endocannabinoid system. These healthy fats support neurotransmitter function and reduce inflammation.",
  },
  {
    title: "Blood Sugar",
    body: "Stable blood sugar reduces cannabis cravings. Eat every 3–4 hours with a balance of protein, healthy fat, and complex carbohydrates.",
  },
  {
    title: "Gut Health",
    body: "70% of dopamine is produced in the gut. Fermented foods like yoghurt, kimchi, and sauerkraut support mood recovery and gut-brain health.",
  },
  {
    title: "Vitamins & Minerals",
    body: "B vitamins (especially B6, B12) and Vitamin C are depleted by heavy cannabis use. Leafy greens, citrus, and fortified cereals help replenish them.",
  },
  {
    title: "Foods to Avoid",
    body: "Alcohol, caffeine excess, and sugar spikes all exacerbate withdrawal symptoms. Replace processed snacks with whole foods to stabilise energy.",
  },
]

const moodData = [
  { meal: "Mon", mood: 2 },
  { meal: "Tue", mood: 1 },
  { meal: "Wed", mood: 2 },
  { meal: "Thu", mood: 3 },
  { meal: "Fri", mood: 2 },
  { meal: "Sat", mood: 3 },
  { meal: "Sun", mood: 3 },
]

const tips = [
  "Start your day with protein — it stabilises blood sugar and reduces morning cravings.",
  "Hydrate before meals. Thirst is often mistaken for hunger or cravings.",
  "Include fermented foods daily to support your gut-brain axis and mood recovery.",
  "Omega-3s reduce inflammation in the brain. Try salmon, sardines, or flaxseed.",
  "Avoid skipping meals — low blood sugar triggers cannabis cravings.",
]

export default function NutritionGuide() {
  const [openSection, setOpenSection] = useState<number | null>(null)
  const [meals, setMeals] = useState({ breakfast: "", lunch: "", dinner: "" })
  const [feelings, setFeelings] = useState<Record<string, number | null>>({ breakfast: null, lunch: null, dinner: null })
  const [savedMeals, setSavedMeals] = useState(false)
  const [tipIndex] = useState(0)

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-3">Recovery Nutrition Principles</h3>
        <div className="space-y-1">
          {accordionItems.map((item, i) => (
            <div key={i} className="rounded-xl border">
              <button
                onClick={() => setOpenSection(openSection === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-sm font-medium text-foreground">{item.title}</span>
                {openSection === i ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
              </button>
              {openSection === i && (
                <div className="border-t px-4 py-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-4">Meal Log</h3>
        <div className="space-y-4">
          {(["breakfast", "lunch", "dinner"] as const).map((meal) => (
            <div key={meal}>
              <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">{meal}</label>
              <input
                type="text"
                value={meals[meal]}
                onChange={(e) => { setMeals({ ...meals, [meal]: e.target.value }); setSavedMeals(false) }}
                placeholder={`What did you eat for ${meal}?`}
                className="w-full rounded-xl border border-muted-foreground/20 bg-white px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2"
              />
              <div className="flex gap-2">
                {["😔", "😐", "😊"].map((emoji, ei) => (
                  <button
                    key={ei}
                    onClick={() => setFeelings({ ...feelings, [meal]: ei })}
                    className={`rounded-xl border px-3 py-1.5 text-sm transition-all ${
                      feelings[meal] === ei ? "border-primary bg-primary/10" : "border-muted-foreground/20 hover:border-primary/50"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={() => setSavedMeals(true)}
          className="mt-4 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {savedMeals ? "Meals Saved" : "Save Meals"}
        </Button>

        {savedMeals && (
          <div className="mt-4">
            <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">Mood After Eating (This Week)</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <XAxis dataKey="meal" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0.5, 3.5]} ticks={[1, 2, 3]} tickFormatter={(v) => ["", "😔", "😐", "😊"][v]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                  <Line type="monotone" dataKey="mood" stroke="#1A5C3A" strokeWidth={2} dot={{ fill: "#1A5C3A", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border bg-secondary/10 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/20">
            <Leaf className="size-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-foreground/80 leading-relaxed italic">
              &ldquo;{tips[tipIndex]}&rdquo;
            </p>
            <span className="mt-2 inline-block rounded-full bg-white px-2 py-0.5 text-[10px] text-muted-foreground">
              Based on clinical nutritional research
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
