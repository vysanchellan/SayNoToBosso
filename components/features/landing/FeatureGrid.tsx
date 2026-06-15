import { Moon, Wind, Droplets, Trophy, BookOpen, Heart } from "lucide-react"

const features = [
  {
    icon: Moon,
    title: "Sleep Recovery",
    description: "Track, analyse and improve your sleep patterns during withdrawal",
  },
  {
    icon: Wind,
    title: "Breathing Therapy",
    description: "Guided breathwork to manage anxiety, cravings and withdrawal symptoms",
  },
  {
    icon: Droplets,
    title: "Nutrition & Hydration",
    description: "Fuel your brain's recovery with personalised dietary guidance",
  },
  {
    icon: Trophy,
    title: "Milestone Achievements",
    description: "Celebrate every win — from 24 hours to 6 months clean",
  },
  {
    icon: BookOpen,
    title: "Research Library",
    description: "Access SA-relevant clinical research and recovery articles",
  },
  {
    icon: Heart,
    title: "Crisis Support",
    description: "Immediate coping tools and emergency contact when you need them most",
  },
]

export default function FeatureGrid() {
  return (
    <section id="research" className="py-20 sm:py-28 bg-muted/30" aria-label="Features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Everything You Need to Recover
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 2px 12px rgba(13,61,36,0.06)',
              }}
            >
              <div
                className="mb-4 flex size-12 items-center justify-center rounded-full sm:size-14"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.3), hsl(var(--secondary) / 0.1))',
                }}
              >
                <feature.icon className="size-6 sm:size-7" style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <h3 className="mb-2 text-lg font-semibold" style={{ color: 'hsl(var(--forest))' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--text-secondary))' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
