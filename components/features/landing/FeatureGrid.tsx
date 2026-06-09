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
    <section className="py-20 sm:py-28 bg-muted/30" aria-label="Features">
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
              className="group rounded-2xl bg-white p-6 sm:p-8 transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-secondary/20 sm:size-12">
                <feature.icon className="size-5 text-secondary sm:size-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
