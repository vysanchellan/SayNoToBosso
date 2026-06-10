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
          <h2 className="font-display text-3xl font-bold sm:text-4xl" style={{ color: 'hsl(155,55%,16%)' }}>
            Your Recovery, Step by Step
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--sage-mist)) 100%)',
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 2px 12px rgba(13,61,36,0.06)',
              }}
            >
              <div
                className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-sm font-bold sm:top-6 sm:right-6"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent) / 0.15), hsl(var(--accent) / 0.05))',
                  color: 'hsl(var(--accent))',
                }}
              >
                {step.number}
              </div>

              <div
                className="mb-4 flex size-12 items-center justify-center rounded-full sm:size-14"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.03))',
                }}
              >
                <step.icon className="size-6 sm:size-7" style={{ color: 'hsl(var(--primary))' }} />
              </div>

              <h3 className="mb-2 text-lg font-semibold sm:text-xl" style={{ color: 'hsl(var(--forest))' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--text-secondary))' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
