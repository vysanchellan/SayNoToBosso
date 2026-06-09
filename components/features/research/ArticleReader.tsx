"use client"

import { motion } from "framer-motion"
import { X, ThumbsUp, ThumbsDown, BookOpen } from "lucide-react"

interface Article {
  id: string
  category: string
  title: string
  summary: string
  intro: string
  readTime: string
  author: string
  date: string
  sections: { heading: string; body: string }[]
}

const articles: Record<string, Article> = {
  a1: {
    id: "a1",
    category: "Sleep",
    title: "What Cannabis Does to Your Sleep Architecture",
    summary: "Learn how THC disrupts REM and deep sleep stages, and what happens when you quit.",
    intro: "When you use cannabis regularly, you might feel like it helps you sleep — but the science tells a very different story.",
    readTime: "8 min",
    author: "Dr. Sarah Nkosi",
    date: "May 2026",
    sections: [
      {
        heading: "The Illusion of Better Sleep",
        body: "Many cannabis users report that they fall asleep faster after using. This is true — THC can reduce sleep latency, the time it takes to drift off. But the story doesn't end there. What most users don't realise is that while cannabis helps them fall asleep, it significantly degrades the quality of that sleep.\n\nTHC suppresses REM sleep, the stage where dreaming occurs and where the brain processes emotions and consolidates memories. It also reduces the amount of time spent in slow-wave sleep, the deep, restorative stage that your body needs for physical repair and recovery.\n\nThe result is a night where you fall asleep quickly but wake up feeling unrefreshed, groggy, and mentally foggy. Over months and years, this poor-quality sleep accumulates, contributing to mood disorders, cognitive decline, and a weakened immune system."
      },
      {
        heading: "The REM Rebound Effect",
        body: "When you stop using cannabis, your brain enters what's called REM rebound. This is your brain's attempt to make up for all the lost dream time that was suppressed by THC. It typically begins within 24 to 48 hours of your last use and can last from one to three weeks.\n\nDuring this period, you might experience extremely vivid, bizarre, or intense dreams. Some people report nightmares or disturbing content. While unsettling, this is actually a positive sign — your brain is rapidly repairing its sleep architecture and restoring healthy REM function.\n\nAccording to research published in the South African Medical Journal, REM rebound is one of the most consistent effects of cannabis cessation and is a key indicator that the brain's endocannabinoid system is rebalancing."
      },
      {
        heading: "How Withdrawal Disrupts Sleep",
        body: "Cannabis withdrawal syndrome includes several sleep-related symptoms: difficulty falling asleep, frequent night-time awakenings, night sweats, and vivid or disturbing dreams. These symptoms are most intense during the first week of cessation and typically improve over two to four weeks.\n\nThe physical symptoms — particularly night sweats — are caused by the body's temperature regulation system recalibrating after THC's suppressive effect on the hypothalamus. Your body temperature naturally drops during sleep, but cannabis blunts this effect. During withdrawal, the system overcorrects, leading to night sweats and temperature instability."
      },
      {
        heading: "Timeline of Sleep Recovery",
        body: "Week 1: Sleep disruption peaks. Difficulty falling asleep, frequent waking, intense sweating, and vivid dreams. Focus on basic sleep hygiene.\n\nWeeks 2-3: Sleep begins to consolidate. Fewer awakenings. Dreams remain vivid but less disturbing. Night sweats decrease.\n\nWeeks 4-6: Significant improvement. Most people report feeling rested in the morning. Sleep quality often exceeds pre-cannabis levels.\n\nMonths 2+: Sleep architecture normalises completely. Natural, restorative sleep cycles are restored.\n\nKey Finding: Sleep quality after cannabis cessation consistently improves to baseline or better within 4-6 weeks, according to multiple clinical studies."
      },
      {
        heading: "Practical Tips for Better Sleep in Recovery",
        body: "1. Maintain a consistent sleep schedule — go to bed and wake up at the same time every day, even weekends.\n2. Keep your bedroom cool (15-19°C) and completely dark.\n3. Avoid screens for at least 60 minutes before bed. Blue light suppresses melatonin production.\n4. Consider a warm bath 90 minutes before bed — the subsequent temperature drop signals your body to sleep.\n5. Try magnesium glycinate (200mg) before bed, but consult your care team first.\n6. If you can't sleep after 20 minutes, get up and do something calming in dim light. Return to bed only when you feel sleepy."
      },
    ],
  },
  a5: {
    id: "a5",
    category: "Mental Health",
    title: "Anxiety After Cannabis: What's Happening in Your Brain",
    summary: "The surprising truth about why quitting can make you more anxious — and how it gets better.",
    intro: "If you feel more anxious after stopping cannabis than you did while using, you're not imagining it. Here's what's happening inside your brain.",
    readTime: "9 min",
    author: "Dr. Thabo Molefe",
    date: "May 2026",
    sections: [
      {
        heading: "The Anxiety Paradox",
        body: "Many people begin using cannabis specifically to manage anxiety. The immediate relief is real — THC temporarily suppresses activity in the amygdala, the brain's fear centre. But here's the paradox that every cannabis user needs to understand: while cannabis provides short-term relief from anxiety, chronic use actually increases baseline anxiety levels over time.\n\nResearch shows that daily cannabis users have higher resting cortisol levels (your primary stress hormone) and greater amygdala reactivity during periods of abstinence than non-users. Your brain has essentially outsourced its calming system to an external source, and without it, your natural stress response is weaker and more reactive.\n\nThis means that the anxiety you feel when you stop isn't just you 'going back to normal.' It's a rebound effect — your brain overcorrecting after being suppressed by THC for so long."
      },
      {
        heading: "The Science of the Rebound",
        body: "Here's what happens at a neurological level: THC binds to CB1 receptors in your endocannabinoid system, which is deeply involved in regulating stress and anxiety. With chronic use, your brain downregulates these receptors — it reduces their number and sensitivity — to compensate for the constant flood of external cannabinoids.\n\nWhen you stop using cannabis, you're left with fewer active CB1 receptors to manage stress. Your amygdala becomes hyperactive. Your HPA axis (the body's central stress response system) goes into overdrive. The result is a period of heightened anxiety that can last from one to four weeks.\n\nThis is not your baseline anxiety. This is withdrawal. And it passes."
      },
      {
        heading: "Why Anxiety Decreases — The Evidence",
        body: "A 2021 meta-analysis published in The Lancet Psychiatry examined 31 studies on cannabis and anxiety. The findings were clear: daily cannabis users had 2.5 times higher odds of developing an anxiety disorder compared to non-users. But crucially, stopping cannabis use was associated with significant reductions in anxiety symptoms within three months.\n\nA 2023 study from Stanford University found that THC exposure caused measurable changes to amygdala-prefrontal cortex connectivity, and these changes correlated with increased anxiety scores even after 30 days of abstinence. The good news? The brain is plastic. These connections can and do heal.\n\nThe anxiety timeline typically looks like this: Weeks 1-2: Anxiety peaks (rebound). Weeks 3-4: Anxiety begins to drop below pre-cessation levels. Months 2-3: Most people report their anxiety is lower than when they were using."
      },
      {
        heading: "Differentiating Withdrawal Anxiety from an Anxiety Disorder",
        body: "It's important to know the difference between withdrawal-induced anxiety and a clinical anxiety disorder:\n\nWithdrawal anxiety: Comes in waves, peaks within the first two weeks, gradually decreases, and is accompanied by other withdrawal symptoms (sleep disruption, irritability, cravings).\n\nAnxiety disorder: Persistent across time, not clearly linked to cessation, may have been present before cannabis use, and requires professional diagnosis and treatment.\n\nIf your anxiety persists beyond 4-6 weeks of abstinence, or if it's severely impacting your daily functioning, reach out to your care team. CannaClear's program includes screening for co-occurring mental health conditions."
      },
      {
        heading: "Coping Strategies for Withdrawal Anxiety",
        body: "1. Know that it's temporary — anxiety from withdrawal is time-limited and will decrease.\n2. Use breathing exercises — the 4-7-8 technique activates the parasympathetic nervous system.\n3. Exercise daily — even a 15-minute walk reduces cortisol and increases endorphins.\n4. Limit caffeine and sugar — both can exacerbate anxiety symptoms.\n5. Reach out — isolation amplifies anxiety. A 5-minute call to a support person can shift your state.\n6. Consider professional support — your CannaClear care team is available.\n\nKey Finding: Withdrawal-induced anxiety is a normal, temporary neurological response to cannabis cessation. It is not a sign that you need cannabis to function. In fact, the long-term trajectory is clear: anxiety decreases significantly after stopping."
      },
    ],
  },
  a8: {
    id: "a8",
    category: "Science",
    title: "Managing Cannabis Withdrawal: A Week-by-Week Guide",
    summary: "What to expect each week of your recovery journey, from acute withdrawal to long-term healing.",
    intro: "Knowing what to expect can make the difference between relapse and resilience. Here's your week-by-week roadmap through cannabis withdrawal.",
    readTime: "12 min",
    author: "CannaClear Clinical Team",
    date: "May 2026",
    sections: [
      {
        heading: "Week 1: The Acute Phase",
        body: "This is the most physically intense week. Days 1-3 are typically the hardest, with withdrawal symptoms peaking between 24-72 hours after your last use.\n\nWhat to expect: Headaches, night sweats, irritability, anxiety, insomnia or extremely vivid dreams, reduced appetite, and strong cravings. Your energy will be low. Your mood will be unpredictable.\n\nWhat helps: Hydration is critical — aim for 8 glasses of water daily. Rest as much as you can. Use 4-7-8 breathing for anxiety spikes. Have a support person you can call. Remove all cannabis products and paraphernalia from your environment.\n\nMedical supervision is recommended for heavy users. In a facility like White River Manor, 24/7 care is available.\n\nBy Day 5-7, the worst physical symptoms typically begin to subside. You may have moments of clarity. Celebrate these — they are signs of healing."
      },
      {
        heading: "Week 2: Emotional Rollercoaster",
        body: "The physical symptoms are fading, but the emotional landscape intensifies. Many people report feeling raw, vulnerable, or unexpectedly emotional during Week 2.\n\nWhat to expect: Mood swings, irritability, anxiety waves, continued sleep disruption (but improving), increased appetite, and vivid dreams. Cravings may come in waves — they peak and pass within 15-30 minutes.\n\nWhat helps: Journaling is especially valuable this week. Start tracking your mood patterns. Continue daily exercise — even walking. Establish a consistent sleep routine. Reach out to your support network.\n\nTip: Week 2 is when many people feel tempted to 'test' whether they can use cannabis just once. This is the addiction voice. Recognise it, but don't act on it."
      },
      {
        heading: "Weeks 3-4: The Turning Point",
        body: "Most people notice a significant shift during Weeks 3 and 4. Sleep begins to normalise. Energy levels return. The brain fog lifts.\n\nWhat to expect: Improved sleep quality, more stable mood, reduced craving intensity, returning sense of humour, clearer thinking, and moments of genuine well-being. You may also experience boredom — this is normal as your brain relearns how to experience pleasure without substances.\n\nWhat helps: This is a good time to re-engage with hobbies and interests. Your natural reward system is recovering — activities you used to enjoy will gradually feel pleasurable again. Focus on nutrition, exercise, and social connection.\n\nKey milestone: By Day 28, most withdrawal symptoms have resolved significantly. You're not fully recovered, but you're past the hardest part."
      },
      {
        heading: "Weeks 5-6: Identity Rebuilding",
        body: "With the physical and acute psychological withdrawal behind you, Weeks 5-6 are about rebuilding your identity. Who are you without cannabis? What do you value? What brings you joy?\n\nWhat to expect: Stable mood, normal sleep, occasional cravings (usually triggered by specific situations or emotions), and a growing sense of self-efficacy.\n\nWhat helps: Values clarification exercises, reconnecting with old friends (who don't use), exploring new hobbies, and setting short-term goals. This is also a good time to repair relationships damaged during active use."
      },
      {
        heading: "Weeks 7-8: Integration",
        body: "By now, most people report feeling like a different person. The changes in sleep, mood, cognition, and energy are significant and stable.\n\nWhat to expect: Normal sleep patterns, significantly reduced or absent cravings, improved emotional regulation, better memory and concentration, and increased life satisfaction.\n\nWhat helps: Consider helping others who are earlier in their recovery journey. Teaching reinforces learning. Continue building your sober support network. Address any underlying mental health conditions with professional support."
      },
      {
        heading: "Weeks 9-10+: Maintenance and Growth",
        body: "You've built a new foundation. Now it's about maintaining and growing. Relapse prevention becomes the focus.\n\nWhat to expect: Stable recovery, with awareness of triggers and warning signs. Most people feel significantly better than they did while using cannabis.\n\nWhat helps: Continue attending support groups, maintain your wellness routine, have a relapse prevention plan in place, and celebrate your progress. Recovery is not just about stopping a behaviour — it's about building a life you don't want to escape from.\n\nKey Finding: According to research from the South African Medical Research Council, structured withdrawal management combined with psychosocial support significantly improves long-term outcomes. Programs like CannaClear that provide week-by-week guidance have higher completion rates than unstructured approaches."
      },
    ],
  },
}

export default function ArticleReader({
  articleId,
  onClose,
}: {
  articleId: string
  onClose: () => void
}) {
  const article = articles[articleId]

  if (!article) return null

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <BookOpen className="size-5 text-primary" />
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground">{article.readTime}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Close article">
          <X className="size-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <article className="mx-auto max-w-2xl px-6 py-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl mb-3">{article.title}</h1>
          <p className="text-base text-muted-foreground mb-2">{article.author} · {article.date}</p>
          <p className="text-lg italic text-foreground/70 border-l-4 border-primary pl-4 my-6">
            {article.intro}
          </p>

          <div className="space-y-8">
            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
                <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                  {section.body}
                </div>
                {section.heading.includes("Finding") || section.heading.includes("Key Finding") ? (
                  <div className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-4">
                    <p className="text-sm font-medium text-accent mb-1">Key Finding</p>
                    <p className="text-sm text-foreground/80">{section.body.split("\n\n").pop()}</p>
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-10 border-t pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Was this helpful?</p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors" aria-label="Thumbs up">
                <ThumbsUp className="size-4" /> Yes
              </button>
              <button className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors" aria-label="Thumbs down">
                <ThumbsDown className="size-4" /> No
              </button>
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  )
}
