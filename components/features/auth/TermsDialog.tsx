"use client"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using CannaClear, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the application. These terms constitute a legally binding agreement between you and CannaClear, operated by White River Manor.",
  },
  {
    title: "2. Nature of Service",
    content:
      "CannaClear provides digital tools, educational content, and structured recovery programs to support individuals seeking to reduce or eliminate cannabis use. THIS APPLICATION IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or treatment.",
  },
  {
    title: "3. Personal Information and POPIA Compliance",
    content:
      "CannaClear complies fully with the Protection of Personal Information Act (POPIA) of the Republic of South Africa. We collect only the minimum personal information necessary to provide our services. Your personal data will not be sold, traded, or shared with third parties without your explicit consent, except where required by law. You have the right to access, correct, or request deletion of your personal data at any time.",
  },
  {
    title: "4. Health Data Privacy",
    content:
      "Any health-related information you provide (including usage patterns, mood data, sleep tracking, and program progress) is stored securely and encrypted. This data is used exclusively to personalise your recovery program and improve our services. Aggregated, anonymised data may be used for clinical research purposes. You may request deletion of your health data at any time by contacting our data protection officer.",
  },
  {
    title: "5. User Responsibilities",
    content:
      "You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials. You agree not to use CannaClear for any unlawful purpose or in violation of any applicable South African laws and regulations.",
  },
  {
    title: "6. Crisis Support Disclaimer",
    content:
      "CannaClear is not a crisis intervention service. If you are experiencing a mental health emergency, suicidal thoughts, or a medical crisis, please contact the South African Depression and Anxiety Group (SADAG) at 0800 567 567 or call emergency services at 10126. Do not use this application in an emergency.",
  },
  {
    title: "7. Intellectual Property",
    content:
      "All content, features, and functionality of CannaClear — including but not limited to text, graphics, logos, program materials, and software — are owned by CannaClear / White River Manor and are protected by South African and international intellectual property laws.",
  },
  {
    title: "8. Termination",
    content:
      "We reserve the right to suspend or terminate your access to CannaClear at our discretion, particularly if you violate these Terms. You may terminate your account at any time by contacting us. Upon termination, your data will be handled in accordance with our Privacy Policy and POPIA requirements.",
  },
  {
    title: "9. Governing Law",
    content:
      "These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of South Africa.",
  },
]

export function TermsDialog() {
  const [scrolledToBottom, setScrolledToBottom] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10
    if (atBottom) setScrolledToBottom(true)
  }

  return (
    <Dialog>
      <DialogTrigger className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors text-sm font-medium">
        Terms of Service
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Terms &amp; Conditions</DialogTitle>
          <DialogDescription>
            Please read these terms carefully. You must scroll to the bottom to accept.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[50vh] pr-4"
        >
          <div className="space-y-6 text-sm text-muted-foreground">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 font-semibold text-foreground">{section.title}</h3>
                <p className="leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <DialogClose
            render={
              <Button disabled={!scrolledToBottom}>
                Accept &amp; Continue
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
