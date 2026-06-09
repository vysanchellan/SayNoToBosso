"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

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
    <section className="py-20 sm:py-28 bg-muted/40" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
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
              <Card className="h-full border border-secondary/20 bg-white">
                <CardContent className="p-6 sm:p-8 space-y-5">
                  <Quote className="size-8 text-primary/20" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <Avatar className="size-10">
                      <AvatarImage src={t.avatar} alt={t.name} />
                      <AvatarFallback>{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.location ? `${t.location} — ` : ""}{t.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
