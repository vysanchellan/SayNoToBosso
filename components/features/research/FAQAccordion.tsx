"use client"

import { useState } from "react"
import { ChevronDown, Leaf } from "lucide-react"

const faqs = [
  {
    q: "How long does cannabis withdrawal last?",
    a: "Acute withdrawal symptoms typically last 1 to 3 weeks. The most intense physical symptoms peak between 24-72 hours after last use and usually resolve within 7-10 days. Emotional and psychological symptoms like cravings, mood swings, and sleep disruption may persist for 2-4 weeks. A small percentage of people experience post-acute withdrawal symptoms (PAWS) that can last 2-6 months, though these are generally less intense.",
  },
  {
    q: "Will I ever feel normal again?",
    a: "Yes. The vast majority of people who stop cannabis use report feeling better than they did while using within 4-8 weeks. Your brain's chemistry is remarkably adaptable — a process called neuroplasticity. The endocannabinoid system rebalances, dopamine receptors regain sensitivity, and sleep architecture normalises. Many people describe feeling 'more like myself' after 30-60 days of abstinence.",
  },
  {
    q: "Is cannabis addiction real?",
    a: "Yes. Cannabis Use Disorder is a recognised medical diagnosis in the DSM-5 and ICD-11. Approximately 9-30% of cannabis users develop some degree of dependency. This rate increases to 25-50% for daily users. Cannabis addiction is characterised by tolerance, withdrawal symptoms when stopping, continued use despite negative consequences, and significant time spent obtaining or using cannabis.",
  },
  {
    q: "Why do I have such vivid dreams now?",
    a: "THC suppresses REM sleep, the stage of sleep where dreaming occurs. When you stop using cannabis, your brain enters a REM rebound state, making up for lost dream time. This typically results in extremely vivid, intense, and often bizarre dreams. While unsettling, this is a positive sign that your brain is healing and restoring healthy sleep architecture. The vivid dreams usually subside within 1-3 weeks.",
  },
  {
    q: "Can I exercise during withdrawal?",
    a: "Absolutely. Exercise is one of the most effective interventions for cannabis withdrawal. Physical activity increases natural dopamine and endocannabinoid levels, directly reducing cravings. It also helps regulate sleep, reduces anxiety, and improves mood. Start gently — even a 15-minute walk can help. Listen to your body, especially during the first week when energy levels are low.",
  },
  {
    q: "What supplements help with cannabis withdrawal?",
    a: "While no supplement replaces medical care, some may help manage specific symptoms. Magnesium glycinate (200mg before bed) may help with sleep and muscle tension. Omega-3 fatty acids support brain health and endocannabinoid system repair. B-complex vitamins, particularly B6 and B12, support neurotransmitter function. Always consult your healthcare provider before starting any supplement regimen.",
  },
  {
    q: "How do I deal with cravings in the moment?",
    a: "Cravings typically peak within 5-15 minutes and then pass. Use the 'STOP' technique: Stop what you're doing, Take a breath, Observe what you're feeling, and Proceed with a healthy alternative. Call a support person, do a breathing exercise, go for a walk, or engage in a distracting activity. Remember: cravings are like waves — they rise, peak, and fall. You don't have to act on them.",
  },
  {
    q: "Is it normal to feel more anxious after stopping?",
    a: "Yes, this is extremely common. Cannabis suppresses the amygdala's threat response. When you stop, your amygdala can become temporarily hyperactive — a rebound effect. This typically causes increased anxiety, especially in the first 1-3 weeks. The good news is that this is temporary. Research consistently shows that anxiety decreases significantly within 4-8 weeks of abstinence.",
  },
  {
    q: "How does the CannaClear program compare to other rehab approaches?",
    a: "CannaClear is based on evidence-based practices including cognitive behavioural therapy (CBT), motivational interviewing, and mindfulness-based relapse prevention. It is specifically tailored for cannabis dependency, unlike general substance abuse programs. The program is designed for South African users and incorporates local context, including POPIA compliance and SA-specific support resources.",
  },
  {
    q: "What support is available in South Africa?",
    a: "South Africa has several resources for cannabis recovery support. The South African Depression and Anxiety Group (SADAG) offers free telephonic counselling at 0800 456 789. There are also private rehab facilities like White River Manor that offer specialised cannabis recovery programs. Support groups and online resources are increasingly available. Your CannaClear care team can connect you with appropriate resources in your area.",
  },
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">Common Questions About Cannabis Recovery</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border bg-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/30"
            >
              <Leaf className="size-4 text-primary shrink-0" />
              <span className="flex-1 text-sm font-medium text-foreground">{faq.q}</span>
              <ChevronDown
                className={`size-4 text-muted-foreground shrink-0 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="border-t px-4 py-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
