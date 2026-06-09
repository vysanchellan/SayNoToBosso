import { ClipboardCheck, Hammer, CalendarCheck, HeartHandshake } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: ClipboardCheck,
    title: "Assessment",
    description:
      "Complete our clinical intake and get matched to your personalised program tier",
  },
  {
    number: 2,
    icon: Hammer,
    title: "Daily Tools",
    description:
      "Breathing exercises, sleep tracking, hydration logging, mood check-ins",
  },
  {
    number: 3,
    icon: CalendarCheck,
    title: "Weekly Milestones",
    description:
      "Progress through your week-by-week program with science-backed content",
  },
  {
    number: 4,
    icon: HeartHandshake,
    title: "Ongoing Support",
    description:
      "Access your care team, crisis resources, and community at any time",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28" aria-label="How it works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Your Recovery, Step by Step
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-secondary/30 bg-white p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent sm:top-6 sm:right-6">
                {step.number}
              </div>

              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 sm:size-14">
                <step.icon className="size-6 text-primary sm:size-7" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
