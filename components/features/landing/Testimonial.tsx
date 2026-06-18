"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "I had no idea what to do after leaving the centre. CannaClear gave me structure, daily goals, and the confidence that I wasn't doing this alone.",
    name: "Thabo M.",
    location: "Johannesburg",
    role: "Former Patient",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    initials: "TM",
  },
  {
    quote:
      "The breathing exercises alone changed everything for me in week one. I finally slept through the night.",
    name: "Riaan V.",
    location: "Cape Town",
    role: "8 Months Clean",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    initials: "RV",
  },
  {
    quote:
      "As a counsellor, I recommend this to every patient. The week-by-week program matches clinical best practices perfectly.",
    name: "Dr. Naledi S.",
    location: "",
    role: "Addiction Counsellor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    initials: "NS",
  },
]

export default function Testimonial() {
  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: '#0A1A0E' }} aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display" style={{ color: '#F2F7F1' }}>
            Real Stories from Real People
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="h-full rounded-2xl p-8" style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}>
                <Quote className="size-8 mb-4" style={{ color: 'rgba(74,222,128,0.35)' }} />
                <p className="text-base leading-relaxed mb-6" style={{ color: '#D7E6DA' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="size-10 rounded-full overflow-hidden shrink-0" style={{ border: '2px solid #1F3326' }}>
                    <img src={t.avatar} alt={t.name} className="size-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#F2F7F1' }}>{t.name}</div>
                    <div className="text-sm" style={{ color: '#74917B' }}>
                      {t.location ? `${t.location} — ` : ""}{t.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
