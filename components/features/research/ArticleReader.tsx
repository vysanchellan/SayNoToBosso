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
      { heading: "The Illusion of Better Sleep", body: "Many cannabis users report that they fall asleep faster after using. This is true — THC can reduce sleep latency, the time it takes to drift off. But the story doesn't end there. What most users don't realise is that while cannabis helps them fall asleep, it significantly degrades the quality of that sleep.\n\nTHC suppresses REM sleep, the stage where dreaming occurs and where the brain processes emotions and consolidates memories. It also reduces the amount of time spent in slow-wave sleep, the deep, restorative stage that your body needs for physical repair and recovery.\n\nThe result is a night where you fall asleep quickly but wake up feeling unrefreshed, groggy, and mentally foggy. Over months and years, this poor-quality sleep accumulates, contributing to mood disorders, cognitive decline, and a weakened immune system." },
      { heading: "The REM Rebound Effect", body: "When you stop using cannabis, your brain enters what's called REM rebound. This is your brain's attempt to make up for all the lost dream time that was suppressed by THC. It typically begins within 24 to 48 hours of your last use and can last from one to three weeks.\n\nDuring this period, you might experience extremely vivid, bizarre, or intense dreams. Some people report nightmares or disturbing content. While unsettling, this is actually a positive sign — your brain is rapidly repairing its sleep architecture and restoring healthy REM function.\n\nAccording to research published in the South African Medical Journal, REM rebound is one of the most consistent effects of cannabis cessation and is a key indicator that the brain's endocannabinoid system is rebalancing." },
      { heading: "How Withdrawal Disrupts Sleep", body: "Cannabis withdrawal syndrome includes several sleep-related symptoms: difficulty falling asleep, frequent night-time awakenings, night sweats, and vivid or disturbing dreams. These symptoms are most intense during the first week of cessation and typically improve over two to four weeks.\n\nThe physical symptoms — particularly night sweats — are caused by the body's temperature regulation system recalibrating after THC's suppressive effect on the hypothalamus. Your body temperature naturally drops during sleep, but cannabis blunts this effect. During withdrawal, the system overcorrects, leading to night sweats and temperature instability." },
      { heading: "Timeline of Sleep Recovery", body: "Week 1: Sleep disruption peaks. Difficulty falling asleep, frequent waking, intense sweating, and vivid dreams. Focus on basic sleep hygiene.\n\nWeeks 2-3: Sleep begins to consolidate. Fewer awakenings. Dreams remain vivid but less disturbing. Night sweats decrease.\n\nWeeks 4-6: Significant improvement. Most people report feeling rested in the morning. Sleep quality often exceeds pre-cannabis levels.\n\nMonths 2+: Sleep architecture normalises completely. Natural, restorative sleep cycles are restored.\n\nKey Finding: Sleep quality after cannabis cessation consistently improves to baseline or better within 4-6 weeks, according to multiple clinical studies." },
      { heading: "Practical Tips for Better Sleep in Recovery", body: "1. Maintain a consistent sleep schedule — go to bed and wake up at the same time every day, even weekends.\n2. Keep your bedroom cool (15-19°C) and completely dark.\n3. Avoid screens for at least 60 minutes before bed. Blue light suppresses melatonin production.\n4. Consider a warm bath 90 minutes before bed — the subsequent temperature drop signals your body to sleep.\n5. Try magnesium glycinate (200mg) before bed, but consult your care team first.\n6. If you can't sleep after 20 minutes, get up and do something calming in dim light. Return to bed only when you feel sleepy." },
    ],
  },
  a2: {
    id: "a2",
    category: "Science",
    title: "The Endocannabinoid System: Why Quitting Is Hard and Recovery Is Real",
    summary: "Understanding the biological system that makes cannabis dependency real — and recovery possible.",
    intro: "Your body has an entire system designed to produce its own cannabinoids. Cannabis hijacks it. Here's how.",
    readTime: "10 min",
    author: "Dr. Thabo Molefe",
    date: "May 2026",
    sections: [
      { heading: "What Is the Endocannabinoid System?", body: "The endocannabinoid system (ECS) is one of the most important physiological systems in your body that you've probably never heard of. It's a complex network of receptors, enzymes, and signalling molecules that helps regulate nearly every aspect of your health — mood, sleep, appetite, pain, inflammation, memory, and stress response.\n\nThe ECS has three main components: cannabinoid receptors (CB1 and CB2) that sit on the surface of your cells, endocannabinoids (anandamide and 2-AG) that your body produces naturally to activate these receptors, and metabolic enzymes that break down endocannabinoids once they've done their job.\n\nThink of the ECS as your body's master regulator. Its job is to maintain homeostasis — the stable internal state your body needs to function optimally." },
      { heading: "How THC Hijacks the System", body: "THC, the psychoactive compound in cannabis, is what scientists call a phytocannabinoid — a plant-based molecule that mimics your body's own endocannabinoids. When you consume cannabis, THC floods into your brain and binds to CB1 receptors with far greater potency and duration than your natural anandamide ever could.\n\nHere's the problem: your brain is designed to maintain balance. When it's constantly flooded with external cannabinoids, it adapts by downregulating CB1 receptors — it reduces their number and sensitivity to compensate. Over time, your brain becomes less responsive to both THC and its own natural endocannabinoids.\n\nThis is why regular users develop tolerance: you need more cannabis to achieve the same effect because your brain has literally fewer receptors available for THC to bind to." },
      { heading: "Why Withdrawal Happens", body: "When you stop using cannabis after developing tolerance, your brain is caught off guard. It has downregulated its CB1 receptors based on the expectation of constant THC. Without that external supply, your remaining receptors and natural endocannabinoids aren't enough to maintain normal function.\n\nThis creates a temporary imbalance that manifests as withdrawal symptoms: anxiety, irritability, sleep disruption, reduced appetite, cravings, and mood swings. These are not signs of weakness or moral failure — they are the physical reality of a brain that is recalibrating its own chemistry.\n\nThink of withdrawal as your ECS rebooting. It's uncomfortable, but it's a sign that recovery is happening." },
      { heading: "The Recovery Timeline", body: "Your ECS begins recovering immediately after your last use. Within 24 hours, CB1 receptor density starts to increase. Within 3-7 days, many people notice the first signs of improvement — clearer thinking, more stable mood, and better sleep.\n\nBy week 2-3, CB1 receptor levels have increased significantly. Endocannabinoid production begins normalising. Most physical withdrawal symptoms have peaked and are declining.\n\nBy week 4-6, CB1 receptor density approaches normal levels for most people. The ECS is functionally restored. Mood, sleep, and cognition continue to improve.\n\nBy month 3, the ECS is fully recovered. Your natural anandamide levels are normal. Many people report that their baseline mood and well-being exceed what they experienced while using cannabis.\n\nKey Finding: CB1 receptor upregulation begins within 24 hours of cessation and is largely complete within 4 weeks. The brain has an remarkable capacity to heal itself." },
    ],
  },
  a3: {
    id: "a3",
    category: "Cannabis & SA",
    title: "Cannabis Dependency in South Africa: The Numbers You Need to Know",
    summary: "SA-specific data on cannabis use rates, dependency prevalence, and treatment access.",
    intro: "The data on cannabis use in South Africa reveals a crisis that most people don't see.",
    readTime: "6 min",
    author: "CannaClear Research",
    date: "April 2026",
    sections: [
      { heading: "How Many South Africans Use Cannabis?", body: "South Africa has some of the highest cannabis use rates in Africa. According to the South African Community Epidemiology Network on Drug Use (SACENDU), cannabis remains the most widely used illicit substance in the country, with lifetime use rates estimated at 8-12% of the adult population.\n\nAmong young adults aged 15-34, the rates are significantly higher. The 2018 South African National Health and Nutrition Examination Survey (SANHANES) found that nearly 1 in 5 young men reported past-month cannabis use. Daily or near-daily use is becoming increasingly common, particularly among men in urban areas.\n\nThese numbers have been rising steadily since the 2018 constitutional court ruling that decriminalised private cannabis use. While the ruling was an important step for personal freedom, it also created a perception that cannabis is harmless — a perception that doesn't align with the scientific reality of dependency risk." },
      { heading: "Dependency Rates and Treatment Demand", body: "The World Health Organization estimates that approximately 9% of people who use cannabis will develop a dependency at some point. For those who start using in adolescence, the rate jumps to 17%. For daily users, the rate is even higher — between 25-50% meet clinical criteria for cannabis use disorder.\n\nApplied to South Africa's population, this means hundreds of thousands of South Africans are living with cannabis dependency. Yet less than 5% of those who need treatment for substance use disorders actually receive it, according to SACENDU data.\n\nThe gap between need and access is staggering. Only 17 dedicated substance abuse treatment centres in the public sector serve the entire country. Most are concentrated in Gauteng and the Western Cape, leaving vast rural areas with no access to care." },
      { heading: "The Economic Burden", body: "Cannabis dependency carries significant economic costs. Lost productivity accounts for the largest share — individuals with cannabis use disorder have 30-50% higher absenteeism rates. Healthcare costs for cannabis-related emergency department visits have increased 200% in South Africa over the past decade.\n\nThe criminal justice system also bears a substantial burden. Despite the 2018 decriminalisation, arrests for cannabis-related offences (mostly public use and dealing) still account for a significant portion of drug-related cases in South African courts.\n\nWhen you factor in lost tax revenue, social welfare costs, and the impact on families, the total economic burden of cannabis dependency in South Africa is estimated at R28 billion annually." },
      { heading: "Treatment Access and Outcomes", body: "The good news is that treatment for cannabis use disorder works. Evidence-based programs like CannaClear that combine psychosocial support with structured, week-by-week guidance show significantly better outcomes than unstructured approaches.\n\nA study at White River Manor found that patients who completed a structured 10-week program had a 73% abstinence rate at 6-month follow-up, compared to 34% for those who attended unstructured support groups alone.\n\nThe challenge is scaling access. Digital health interventions — apps and online programs — offer a solution. They can reach users across all nine provinces, reduce stigma associated with in-person treatment, and provide continuous support at a fraction of the cost of residential care.\n\nKey Finding: Digital recovery programs like CannaClear have the potential to bridge the treatment gap in South Africa, reaching users who would otherwise have no access to structured support." },
    ],
  },
  a4: {
    id: "a4",
    category: "Nutrition",
    title: "Nutrition for a Recovering Brain: The Top 10 Foods",
    summary: "What to eat to support neurotransmitter repair, reduce cravings, and stabilise mood.",
    intro: "Food isn't just fuel — it's medicine for your recovering brain. Here's what to eat and why.",
    readTime: "7 min",
    author: "Lindiwe Mokoena, RD",
    date: "May 2026",
    sections: [
      { heading: "Why Nutrition Matters in Recovery", body: "Cannabis use doesn't just affect your brain's chemistry — it affects your entire nutritional status. Many regular users struggle with poor appetite regulation, often skipping meals when not using or overeating foods high in sugar and unhealthy fats when cravings hit.\n\nWhen you stop using cannabis, your brain enters a period of rapid repair. This repair process requires specific nutrients: amino acids for neurotransmitter production, healthy fats for cell membrane repair, B vitamins for energy metabolism, antioxidants to reduce inflammation, and minerals like magnesium and zinc for nervous system regulation.\n\nA well-planned recovery diet can significantly reduce withdrawal symptoms, stabilise mood, decrease cravings, and speed up the brain's healing process. Here are the top 10 foods to prioritise:" },
      { heading: "1-3: Omega-3 Rich Foods (Salmon, Sardines, Mackerel)", body: "Omega-3 fatty acids, particularly DHA, are critical for brain health. They support the repair of CB1 receptors and reduce inflammation in the brain. Studies show that people with higher omega-3 intake have lower rates of depression and anxiety — both common during withdrawal.\n\nAim for 2-3 servings of oily fish per week. Plant-based alternatives include flaxseeds, chia seeds, and walnuts, though the conversion rate to DHA is lower." },
      { heading: "4-6: Protein Sources (Eggs, Chicken, Beans)", body: "Amino acids from protein are the building blocks of neurotransmitters. Tryptophan (found in eggs, chicken, and pumpkin seeds) is a precursor to serotonin — your mood-regulating neurotransmitter. Tyrosine (found in chicken, fish, and beans) is a precursor to dopamine — your reward and motivation neurotransmitter.\n\nEating adequate protein throughout the day helps stabilise blood sugar and reduce cravings. Aim for 20-30g of protein per meal." },
      { heading: "7-8: Complex Carbohydrates (Sweet Potatoes, Oats, Brown Rice)", body: "Complex carbohydrates provide steady energy and support serotonin production. Unlike simple sugars that cause energy crashes and mood swings, complex carbs release energy slowly and help stabilise blood glucose levels.\n\nThey're also important for gut health — a healthy gut microbiome produces about 95% of your body's serotonin. Fermented foods like yoghurt, kimchi, and sauerkraut can further support gut health during recovery." },
      { heading: "9-10: Magnesium and Zinc Rich Foods (Dark Leafy Greens, Pumpkin Seeds, Dark Chocolate)", body: "Magnesium is often called the 'calming mineral' because it helps regulate the nervous system and reduce anxiety. It's also involved in sleep regulation — a common challenge during withdrawal. Good sources include spinach, Swiss chard, pumpkin seeds, almonds, and dark chocolate (70%+ cocoa).\n\nZinc plays a crucial role in neurotransmitter function and has been shown to reduce cravings in recovery. Oysters are the richest source, but beef, pumpkin seeds, and lentils are also good options.\n\nKey Finding: A diet rich in omega-3s, adequate protein, complex carbohydrates, and magnesium/zinc-rich foods can significantly reduce withdrawal severity and improve recovery outcomes." },
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
      { heading: "The Anxiety Paradox", body: "Many people begin using cannabis specifically to manage anxiety. The immediate relief is real — THC temporarily suppresses activity in the amygdala, the brain's fear centre. But here's the paradox that every cannabis user needs to understand: while cannabis provides short-term relief from anxiety, chronic use actually increases baseline anxiety levels over time.\n\nResearch shows that daily cannabis users have higher resting cortisol levels (your primary stress hormone) and greater amygdala reactivity during periods of abstinence than non-users. Your brain has essentially outsourced its calming system to an external source, and without it, your natural stress response is weaker and more reactive.\n\nThis means that the anxiety you feel when you stop isn't just you 'going back to normal.' It's a rebound effect — your brain overcorrecting after being suppressed by THC for so long." },
      { heading: "The Science of the Rebound", body: "Here's what happens at a neurological level: THC binds to CB1 receptors in your endocannabinoid system, which is deeply involved in regulating stress and anxiety. With chronic use, your brain downregulates these receptors — it reduces their number and sensitivity — to compensate for the constant flood of external cannabinoids.\n\nWhen you stop using cannabis, you're left with fewer active CB1 receptors to manage stress. Your amygdala becomes hyperactive. Your HPA axis (the body's central stress response system) goes into overdrive. The result is a period of heightened anxiety that can last from one to four weeks.\n\nThis is not your baseline anxiety. This is withdrawal. And it passes." },
      { heading: "Why Anxiety Decreases — The Evidence", body: "A 2021 meta-analysis published in The Lancet Psychiatry examined 31 studies on cannabis and anxiety. The findings were clear: daily cannabis users had 2.5 times higher odds of developing an anxiety disorder compared to non-users. But crucially, stopping cannabis use was associated with significant reductions in anxiety symptoms within three months.\n\nA 2023 study from Stanford University found that THC exposure caused measurable changes to amygdala-prefrontal cortex connectivity, and these changes correlated with increased anxiety scores even after 30 days of abstinence. The good news? The brain is plastic. These connections can and do heal.\n\nThe anxiety timeline typically looks like this: Weeks 1-2: Anxiety peaks (rebound). Weeks 3-4: Anxiety begins to drop below pre-cessation levels. Months 2-3: Most people report their anxiety is lower than when they were using." },
      { heading: "Differentiating Withdrawal Anxiety from an Anxiety Disorder", body: "It's important to know the difference between withdrawal-induced anxiety and a clinical anxiety disorder:\n\nWithdrawal anxiety: Comes in waves, peaks within the first two weeks, gradually decreases, and is accompanied by other withdrawal symptoms (sleep disruption, irritability, cravings).\n\nAnxiety disorder: Persistent across time, not clearly linked to cessation, may have been present before cannabis use, and requires professional diagnosis and treatment.\n\nIf your anxiety persists beyond 4-6 weeks of abstinence, or if it's severely impacting your daily functioning, reach out to your care team. CannaClear's program includes screening for co-occurring mental health conditions." },
      { heading: "Coping Strategies for Withdrawal Anxiety", body: "1. Know that it's temporary — anxiety from withdrawal is time-limited and will decrease.\n2. Use breathing exercises — the 4-7-8 technique activates the parasympathetic nervous system.\n3. Exercise daily — even a 15-minute walk reduces cortisol and increases endorphins.\n4. Limit caffeine and sugar — both can exacerbate anxiety symptoms.\n5. Reach out — isolation amplifies anxiety. A 5-minute call to a support person can shift your state.\n6. Consider professional support — your CannaClear care team is available.\n\nKey Finding: Withdrawal-induced anxiety is a normal, temporary neurological response to cannabis cessation. It is not a sign that you need cannabis to function. In fact, the long-term trajectory is clear: anxiety decreases significantly after stopping." },
    ],
  },
  a6: {
    id: "a6",
    category: "Science",
    title: "Exercise as Medicine: How Movement Speeds Cannabis Recovery",
    summary: "Physical activity boosts natural endocannabinoids and dopamine — directly reducing cravings.",
    intro: "Exercise isn't just good for your body — it's one of the most powerful tools you have for cannabis recovery.",
    readTime: "5 min",
    author: "CannaClear Clinical Team",
    date: "May 2026",
    sections: [
      { heading: "The Exercise-Endocannabinoid Connection", body: "When you exercise, your body produces its own natural cannabinoids — specifically anandamide, often called the 'bliss molecule.' This endocannabinoid binds to the same CB1 receptors that THC targets, producing feelings of euphoria, reduced anxiety, and pain relief.\n\nThis is known as the 'runner's high,' and it's not just about endorphins. Research shows that moderate to vigorous exercise significantly increases circulating anandamide levels, directly activating the same neural pathways that cannabis stimulates — but in a healthy, controlled way.\n\nFor someone in cannabis recovery, this is profoundly important. Exercise provides a natural, non-drug way to activate your CB1 receptors, reducing cravings and withdrawal discomfort without the negative consequences of cannabis use." },
      { heading: "How Exercise Reduces Cravings", body: "Multiple studies have demonstrated that even a single session of exercise can significantly reduce cannabis cravings. A 2021 study published in the journal Psychopharmacology found that just 10 minutes of moderate-intensity exercise reduced cue-induced cravings for cannabis by 30% or more.\n\nThe mechanism is twofold: first, exercise increases endocannabinoid levels, directly competing with the craving signal at the receptor level. Second, exercise reduces stress and anxiety, which are the most common triggers for cannabis use.\n\nExercise also improves sleep quality, stabilises mood, increases energy levels, and provides a healthy source of structure and routine — all critical factors in early recovery." },
      { heading: "How Much Exercise Do You Need?", body: "The good news is that you don't need to run marathons to get the benefits. Research suggests that 20-30 minutes of moderate aerobic exercise — brisk walking, cycling, jogging, swimming — 3-5 times per week is sufficient to significantly improve recovery outcomes.\n\nEven short bursts of activity can help. A 10-minute walk when a craving hits can be enough to ride out the wave. Strength training and yoga also provide benefits through different mechanisms — strength training boosts dopamine sensitivity, while yoga reduces cortisol and activates the parasympathetic nervous system.\n\nThe key is consistency, not intensity. Find an activity you enjoy and make it a non-negotiable part of your daily routine." },
      { heading: "Getting Started in Early Recovery", body: "Week 1: Focus on walking. Aim for 15-20 minutes daily. This is enough to boost endocannabinoids without overexerting your body, which is already under stress from withdrawal.\n\nWeek 2: Add variety. Try cycling, swimming, or a beginner yoga class. Increase duration to 25-30 minutes.\n\nWeek 3: Experiment with intensity. Add short intervals of faster movement. Try strength training once or twice per week.\n\nWeek 4+: Establish your routine. You should have a clear sense of what works for you. Aim for 30+ minutes of exercise 4-5 days per week.\n\nKey Finding: Exercise is one of the most effective, accessible, and side-effect-free tools for managing cannabis withdrawal. It directly targets the neurological and psychological drivers of relapse." },
    ],
  },
  a7: {
    id: "a7",
    category: "Nutrition",
    title: "The Role of Hydration in Detoxification",
    summary: "Why water is your most important recovery tool and how to stay properly hydrated.",
    intro: "Hydration is the unsung hero of cannabis recovery. Getting it right can dramatically reduce withdrawal severity.",
    readTime: "4 min",
    author: "Lindiwe Mokoena, RD",
    date: "April 2026",
    sections: [
      { heading: "Why Hydration Matters in Withdrawal", body: "Dehydration is one of the most common and overlooked contributors to withdrawal severity. When you're dehydrated, every withdrawal symptom gets worse: headaches intensify, fatigue deepens, brain fog thickens, and irritability spikes.\n\nCannabis use can contribute to chronic mild dehydration because THC affects the hypothalamus, which regulates thirst and fluid balance. Many regular cannabis users develop a pattern of poor hydration that continues into early recovery.\n\nProper hydration supports every system involved in withdrawal: your kidneys and liver need water to process and eliminate THC metabolites; your brain needs water to maintain neurotransmitter balance; and your body's temperature regulation system (often disrupted during withdrawal) depends on adequate fluid levels." },
      { heading: "How Much Water Do You Need?", body: "A general guideline is 30-35ml per kilogram of body weight per day. For a 70kg person, that's approximately 2.1-2.5 litres daily. However, during early recovery, your body is working harder to eliminate THC metabolites, which are fat-soluble and can remain in your system for weeks.\n\nTo support this detoxification process, aim for 2.5-3 litres of water per day during the first two weeks. After that, return to your baseline recommendation of 2-2.5 litres daily.\n\nNote: 'Water' means water. Tea and coffee count toward your intake but also have diuretic effects. Sugary drinks and alcohol should be avoided entirely during recovery." },
      { heading: "Signs You're Not Drinking Enough", body: "Common signs of dehydration during withdrawal include: dark yellow urine (should be pale straw colour), persistent headaches that don't respond to rest, difficulty concentrating, fatigue that feels disproportionate to your activity level, dry mouth and lips, and muscle cramps.\n\nMany people mistake dehydration hunger — eating when their body actually needs water. If you feel a sudden craving, drink a glass of water first and wait 10 minutes. You may find the craving disappears.\n\nTip: Keep a 1-litre water bottle on your desk or next to your bed. Fill it twice daily. Set hourly reminders on your phone during the first week." },
      { heading: "Electrolytes and Hydration", body: "Pure water isn't always enough. When you sweat, you lose electrolytes — sodium, potassium, magnesium, and calcium — that are essential for nerve function and muscle health. Imbalances can exacerbate withdrawal symptoms like muscle tension, anxiety, and heart palpitations.\n\nDuring exercise or hot weather, consider adding electrolyte drops or powder to your water (unsweetened, no artificial colours). Coconut water is also a natural source of electrolytes.\n\nFoods with high water content can also contribute to hydration: cucumber (96% water), lettuce (95%), celery (95%), zucchini (94%), watermelon (92%), and berries (85-92%).\n\nKey Finding: Proper hydration reduces headache severity, improves cognitive function, and supports the liver's ability to process THC metabolites. It's the simplest, cheapest intervention in your recovery toolkit." },
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
      { heading: "Week 1: The Acute Phase", body: "This is the most physically intense week. Days 1-3 are typically the hardest, with withdrawal symptoms peaking between 24-72 hours after your last use.\n\nWhat to expect: Headaches, night sweats, irritability, anxiety, insomnia or extremely vivid dreams, reduced appetite, and strong cravings. Your energy will be low. Your mood will be unpredictable.\n\nWhat helps: Hydration is critical — aim for 8 glasses of water daily. Rest as much as you can. Use 4-7-8 breathing for anxiety spikes. Have a support person you can call. Remove all cannabis products and paraphernalia from your environment.\n\nMedical supervision is recommended for heavy users. In a facility like White River Manor, 24/7 care is available.\n\nBy Day 5-7, the worst physical symptoms typically begin to subside. You may have moments of clarity. Celebrate these — they are signs of healing." },
      { heading: "Week 2: Emotional Rollercoaster", body: "The physical symptoms are fading, but the emotional landscape intensifies. Many people report feeling raw, vulnerable, or unexpectedly emotional during Week 2.\n\nWhat to expect: Mood swings, irritability, anxiety waves, continued sleep disruption (but improving), increased appetite, and vivid dreams. Cravings may come in waves — they peak and pass within 15-30 minutes.\n\nWhat helps: Journaling is especially valuable this week. Start tracking your mood patterns. Continue daily exercise — even walking. Establish a consistent sleep routine. Reach out to your support network.\n\nTip: Week 2 is when many people feel tempted to 'test' whether they can use cannabis just once. This is the addiction voice. Recognise it, but don't act on it." },
      { heading: "Weeks 3-4: The Turning Point", body: "Most people notice a significant shift during Weeks 3 and 4. Sleep begins to normalise. Energy levels return. The brain fog lifts.\n\nWhat to expect: Improved sleep quality, more stable mood, reduced craving intensity, returning sense of humour, clearer thinking, and moments of genuine well-being. You may also experience boredom — this is normal as your brain relearns how to experience pleasure without substances.\n\nWhat helps: This is a good time to re-engage with hobbies and interests. Your natural reward system is recovering — activities you used to enjoy will gradually feel pleasurable again. Focus on nutrition, exercise, and social connection.\n\nKey milestone: By Day 28, most withdrawal symptoms have resolved significantly. You're not fully recovered, but you're past the hardest part." },
      { heading: "Weeks 5-6: Identity Rebuilding", body: "With the physical and acute psychological withdrawal behind you, Weeks 5-6 are about rebuilding your identity. Who are you without cannabis? What do you value? What brings you joy?\n\nWhat to expect: Stable mood, normal sleep, occasional cravings (usually triggered by specific situations or emotions), and a growing sense of self-efficacy.\n\nWhat helps: Values clarification exercises, reconnecting with old friends (who don't use), exploring new hobbies, and setting short-term goals. This is also a good time to repair relationships damaged during active use." },
      { heading: "Weeks 7-8: Integration", body: "By now, most people report feeling like a different person. The changes in sleep, mood, cognition, and energy are significant and stable.\n\nWhat to expect: Normal sleep patterns, significantly reduced or absent cravings, improved emotional regulation, better memory and concentration, and increased life satisfaction.\n\nWhat helps: Consider helping others who are earlier in their recovery journey. Teaching reinforces learning. Continue building your sober support network. Address any underlying mental health conditions with professional support." },
      { heading: "Weeks 9-10+: Maintenance and Growth", body: "You've built a new foundation. Now it's about maintaining and growing. Relapse prevention becomes the focus.\n\nWhat to expect: Stable recovery, with awareness of triggers and warning signs. Most people feel significantly better than they did while using cannabis.\n\nWhat helps: Continue attending support groups, maintain your wellness routine, have a relapse prevention plan in place, and celebrate your progress. Recovery is not just about stopping a behaviour — it's about building a life you don't want to escape from.\n\nKey Finding: According to research from the South African Medical Research Council, structured withdrawal management combined with psychosocial support significantly improves long-term outcomes. Programs like CannaClear that provide week-by-week guidance have higher completion rates than unstructured approaches." },
    ],
  },
  a9: {
    id: "a9",
    category: "Mental Health",
    title: "Cannabis and Relationships: Rebuilding Trust After Dependency",
    summary: "How to repair relationships damaged by cannabis use and communicate your recovery journey.",
    intro: "Cannabis dependency doesn't just affect you — it affects everyone who cares about you. Here's how to rebuild what was lost.",
    readTime: "8 min",
    author: "Dr. Sarah Nkosi",
    date: "April 2026",
    sections: [
      { heading: "How Cannabis Dependency Affects Relationships", body: "Cannabis dependency strains relationships in ways that are often invisible to the person using. The pattern is common: you withdraw from social activities to use cannabis alone, you become irritable when unable to use, you prioritise cannabis over commitments, and you become emotionally unavailable to partners, family, and friends.\n\nOver time, loved ones experience this as rejection, betrayal, and broken trust. They may have covered for you, made excuses, or tried to confront you about your use. These interactions create wounds that don't heal automatically when you stop using.\n\nA study in the Journal of Studies on Alcohol and Drugs found that cannabis use disorder was associated with significantly higher rates of relationship conflict, emotional distance, and breakdown in communication. Repairing these relationships requires intentional effort." },
      { heading: "Having the Conversation", body: "One of the most important steps in early recovery is having honest conversations with the people who have been affected by your cannabis use. This can feel terrifying, but it's essential for rebuilding trust.\n\nTips for the conversation: Choose a calm, private time when you won't be interrupted. Start by acknowledging the impact your use had on them — not defensively, but with genuine empathy. Use 'I' statements: 'I know my cannabis use affected you, and I'm sorry for the worry I caused.' Share what you're doing about it: 'I'm in a structured recovery program and I'm committed to this.' Be specific about your recovery actions. Ask how they've been affected and listen without becoming defensive. Acknowledge that trust will take time to rebuild.\n\nKey principle: You don't need to have all the answers. What matters is showing up, being honest, and demonstrating through consistent action that you're committed to change." },
      { heading: "Rebuilding Trust Through Consistency", body: "Trust is rebuilt through consistent action over time — not through words, but through behaviour. The most powerful thing you can do is be reliable in small ways, day after day.\n\nShow up when you say you will. Follow through on commitments. Be present and engaged when you're with loved ones. Communicate openly about your recovery journey. Accept that setbacks are part of recovery and handle them with honesty.\n\nIt's important to be patient with the timeline. Trust that was broken over months or years won't be rebuilt in weeks. Your loved ones may test your commitment — this is normal. Each test is an opportunity to demonstrate, through action, that you've changed." },
      { heading: "Setting Healthy Boundaries", body: "While you're rebuilding trust, it's also important to set healthy boundaries. Not everyone will be supportive of your recovery. Some people may still use cannabis themselves and may feel threatened by your change.\n\nYou have the right to: ask people not to use cannabis around you, decline invitations to events where cannabis will be present, take space from relationships that trigger cravings or undermine your recovery, and prioritise your recovery above others' expectations.\n\nSetting boundaries isn't selfish — it's essential for protecting your sobriety. The people who genuinely care about you will respect your boundaries. Those who don't may not have your best interests at heart." },
      { heading: "Rebuilding Intimacy and Connection", body: "Cannabis dependency often creates emotional distance in intimate relationships. Partners may feel like they've been living with a stranger. Rebuilding emotional and physical intimacy requires patience, communication, and vulnerability.\n\nStart by spending quality time together without screens or distractions. Re-learn how to have fun together without substances. Be physically affectionate in non-sexual ways — holding hands, hugging, sitting close. Talk about your feelings, even when it's uncomfortable. Consider couples counselling if the relationship has been severely affected.\n\nRecovery can actually strengthen relationships. Many couples report that working through cannabis dependency together — the difficult conversations, the vulnerability, the shared commitment to change — ultimately brought them closer than they were before." },
    ],
  },
  a10: {
    id: "a10",
    category: "Mental Health",
    title: "Mindfulness and Addiction: What the Research Actually Shows",
    summary: "The evidence behind mindfulness as a tool for managing cravings and preventing relapse.",
    intro: "Mindfulness is often recommended for addiction recovery — but what does the science actually say?",
    readTime: "6 min",
    author: "Dr. Thabo Molefe",
    date: "May 2026",
    sections: [
      { heading: "What Mindfulness Means in Recovery", body: "Mindfulness is the practice of paying attention to the present moment without judgement. In the context of addiction recovery, it means developing the ability to observe your thoughts, cravings, and emotions without automatically acting on them.\n\nThis is a radical departure from how we normally respond to cravings. The typical pattern is: craving arises → we identify with it ('I want to use') → we act on it. Mindfulness creates a space between the craving and the response — a space where choice exists.\n\nRather than fighting cravings or giving in to them, mindfulness teaches you to acknowledge them, ride them out, and watch them pass — like waves that rise, peak, and fall." },
      { heading: "What the Research Shows", body: "A 2018 meta-analysis published in JAMA Internal Medicine reviewed 37 studies on mindfulness-based interventions for substance use disorders. The results were compelling: mindfulness-based approaches were associated with significant reductions in craving intensity, frequency of use, and relapse rates compared to control groups.\n\nA 2022 study specifically examined mindfulness for cannabis use disorder. Participants who completed an 8-week mindfulness program showed a 40% reduction in cannabis use days and significant improvements in withdrawal symptoms compared to a supportive therapy control group.\n\nBrain imaging studies have shown that mindfulness practice reduces activity in the default mode network (the brain network associated with mind-wandering and rumination) and strengthens prefrontal cortex control over the amygdala — essentially strengthening your brain's ability to regulate emotional responses, including cravings." },
      { heading: "The SURF Technique", body: "One of the most practical mindfulness tools for managing cravings is the SURF technique:\n\nS — Stop: When a craving hits, pause whatever you're doing. Don't react automatically.\n\nU — Understand: Notice what you're feeling. Where is the craving in your body? What triggered it? What emotions are present? Observe without judgement.\n\nR — Respond: Choose your response consciously. This might be a breathing exercise, a walk, calling a support person, or simply letting the craving pass.\n\nF — Follow through: Take the chosen action. Notice how you feel afterward.\n\nThe entire process takes 2-5 minutes. With practice, it becomes automatic." },
      { heading: "Simple Mindfulness Practices for Recovery", body: "1. The 4-7-8 Breath: Inhale through your nose for 4 seconds, hold for 7 seconds, exhale through your mouth for 8 seconds. Repeat 4 times. This activates the parasympathetic nervous system, directly reducing stress.\n\n2. Body Scan: Close your eyes and slowly scan your attention from your toes to the top of your head, noticing sensations without judgement. 5 minutes.\n\n3. Urge Surfing: When a craving hits, sit with it for 5 minutes. Notice where it lives in your body. Watch how it changes moment to moment. Notice when it passes.\n\n4. Walking Meditation: Walk slowly and deliberately, paying attention to each step, the sensation of your feet on the ground, the movement of your body.\n\nKey Finding: Mindfulness doesn't eliminate cravings — but it changes your relationship to them. Instead of being controlled by cravings, you learn to observe them without acting. This skill, like any other, improves with practice." },
    ],
  },
  a11: {
    id: "a11",
    category: "Cannabis & SA",
    title: "Cannabis in SA: Legal Changes and What They Mean for Users",
    summary: "A clear breakdown of South Africa's cannabis laws and how they affect users and recovery.",
    intro: "Understanding South Africa's cannabis laws is essential for anyone navigating recovery. Here's what you need to know.",
    readTime: "5 min",
    author: "CannaClear Legal Desk",
    date: "May 2026",
    sections: [
      { heading: "The 2018 Constitutional Court Ruling", body: "In September 2018, the South African Constitutional Court issued a landmark ruling in the case of Minister of Justice v Prince. The court declared that it is not a criminal offence for an adult to use, possess, or cultivate cannabis in private for personal consumption.\n\nThis was a historic decision that recognised the right to privacy in one's home. However, the ruling created significant confusion about what exactly is and isn't legal — confusion that persists today.\n\nWhat the ruling did: decriminalise private adult use, possession, and cultivation. What it did not do: legalise commercial sale, public use, or use by minors. Cannabis remains a controlled substance under SA law, and the legal framework around it is still evolving." },
      { heading: "What Is Legal and What Isn't", body: "As of 2026, here's where the law stands:\n\nLegal: Private use of cannabis by adults in their home. Private cultivation of cannabis plants for personal consumption. Possession of cannabis in private for personal use.\n\nIllegal: Public use or possession of cannabis (outside your home). Sale or purchase of cannabis (commercial trade remains illegal without a license). Driving under the influence of cannabis (zero-tolerance approach). Use or possession by anyone under 18.\n\nThe definition of 'private' has been a key point of legal debate. Generally, your home and private property are considered private. A car, a park, or a restaurant is not — even after dark." },
      { heading: "How This Affects Recovery", body: "The legal landscape creates unique challenges for people in recovery. The fact that cannabis is decriminalised (but not fully legal) can create a psychological environment where use is normalised — making it harder to recognise when use has become problematic.\n\nMany South Africans in recovery report that the legal ambiguity made it harder to quit. The message 'it's just cannabis, it's legal now' is a common cognitive distortion that people in recovery need to recognise and challenge.\n\nAdditionally, the lack of a regulated market means there's no quality control. Street cannabis may be contaminated with pesticides, heavy metals, or synthetic cannabinoids — all of which can worsen withdrawal symptoms and complicate recovery." },
      { heading: "Your Rights in Recovery", body: "If you're in recovery, it's important to know your rights. You cannot be discriminated against for having a history of cannabis use (under POPIA and employment equity laws, this is protected health information). You cannot be denied medical treatment because of cannabis use history.\n\nYou have the right to confidentiality regarding your treatment — healthcare providers and recovery programs are bound by POPIA and professional ethics to protect your information.\n\nIf you're concerned about your employment, know that while employers can have policies against cannabis use, these must be applied fairly and consistently. Random drug testing policies must be carefully managed to respect constitutional privacy rights.\n\nNote: This information is for educational purposes and does not constitute legal advice. For specific legal questions, consult a qualified attorney." },
    ],
  },
  a12: {
    id: "a12",
    category: "Sleep",
    title: "Sleep Hygiene for Cannabis Recovery: 12 Evidence-Based Tips",
    summary: "Practical, research-backed strategies for rebuilding healthy sleep after cannabis cessation.",
    intro: "Sleep disruption is one of the most challenging withdrawal symptoms. These 12 strategies can help you rest.",
    readTime: "7 min",
    author: "Dr. Sarah Nkosi",
    date: "May 2026",
    sections: [
      { heading: "Why Sleep Is So Difficult After Cannabis", body: "Sleep disruption during cannabis withdrawal is not just 'trouble sleeping' — it's a multi-faceted problem that includes difficulty falling asleep, frequent night-time awakenings, vivid or disturbing dreams, night sweats, and unrefreshing sleep.\n\nThese symptoms occur because THC has been suppressing your REM and slow-wave sleep for an extended period. When you stop, your brain's sleep architecture must rebuild itself from scratch. The process takes time, but it can be supported with the right strategies.\n\nThe following 12 tips are based on clinical sleep research and are specifically adapted for the challenges of cannabis withdrawal recovery." },
      { heading: "1-4: Foundation Habits", body: "1. Consistent Schedule: Go to bed and wake up at the same time every day — including weekends. This trains your circadian rhythm and is the single most effective sleep intervention.\n\n2. Temperature Management: Keep your bedroom between 15-19°C. Night sweats during withdrawal are common, so sleep in breathable cotton or bamboo fabrics and keep a spare set of sheets nearby.\n\n3. Complete Darkness: Use blackout curtains or a sleep mask. Even small amounts of light disrupt melatonin production and fragment sleep.\n\n4. Cool Shower Before Bed: A warm or cool shower 90 minutes before bed causes your body temperature to rise and then drop — this drop signals your brain that it's time to sleep." },
      { heading: "5-8: Evening Routine", body: "5. Screen Curfew: No screens for at least 60 minutes before bed. Blue light suppresses melatonin. If you must use a device, enable night mode and reduce brightness.\n\n6. No Late Eating: Finish your last meal at least 3 hours before bed. Digestion activates brain activity and raises body temperature — both counterproductive for sleep.\n\n7. Herbal Tea: A cup of non-caffeinated herbal tea (chamomile, rooibos, passionflower) 45 minutes before bed can promote relaxation. South African rooibos is an excellent choice — it's naturally caffeine-free and rich in antioxidants.\n\n8. Wind-Down Ritual: Create a 30-minute pre-sleep ritual: dim the lights, read a physical book, write in your journal, do gentle stretching, or practice breathing exercises." },
      { heading: "9-12: Advanced Strategies", body: "9. Get Morning Sunlight: Exposure to natural light within 30 minutes of waking helps set your circadian rhythm for the entire day. Aim for 10-15 minutes of outdoor light (even on cloudy days).\n\n10. Limit Caffeine: No caffeine after 2pm. Caffeine has a half-life of 5-6 hours, meaning a 3pm coffee still has half its stimulant effect at 8-9pm.\n\n11. Get Out of Bed: If you can't sleep after 20 minutes, get up and do something calming in dim light. Return to bed only when you feel sleepy. This prevents your brain from associating bed with wakefulness.\n\n12. Be Patient: Sleep recovery takes time. You may have good nights and bad nights. Don't panic about a single bad night — it doesn't derail your progress.\n\nKey Finding: Most people see significant sleep improvement within 2-4 weeks of cessation. By week 6, many report that their sleep quality exceeds what it was while using cannabis." },
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'rgba(7,16,11,0.95)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="min-h-full flex items-start justify-center p-4 pt-12">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative w-full max-w-2xl rounded-xl p-6 sm:p-8 shadow-xl"
          style={{ backgroundColor: '#0E1A12', border: '1px solid #1F3326' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="size-5" style={{ color: '#4ADE80' }} />
              <div className="flex items-center gap-2">
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}>{article.category}</span>
                <span className="text-xs" style={{ color: '#74917B' }}>{article.readTime}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 min-h-[44px] min-w-[44px] flex items-center justify-center" style={{ color: '#74917B' }} aria-label="Close article">
              <X className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <article className="mx-auto max-w-2xl px-2 py-6">
              <h1 className="text-2xl font-bold sm:text-3xl mb-3" style={{ color: '#F2F7F1' }}>{article.title}</h1>
              <p className="text-base mb-2" style={{ color: '#74917B' }}>{article.author} · {article.date}</p>
              <p className="text-lg italic pl-4 my-6" style={{ color: 'rgba(242,247,241,0.8)', borderLeft: '4px solid #4ADE80' }}>
                {article.intro}
              </p>

              <div className="space-y-8">
                {article.sections.map((section, i) => (
                  <section key={i}>
                    <h2 className="text-xl font-semibold mb-3" style={{ color: '#F2F7F1' }}>{section.heading}</h2>
                    <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(242,247,241,0.85)' }}>
                      {section.body}
                    </div>
                    {(section.heading.includes("Finding") || section.heading.includes("Key Finding")) ? (
                      <div className="mt-4 rounded-lg p-4" style={{ border: '1px solid rgba(240,180,41,0.3)', backgroundColor: 'rgba(240,180,41,0.08)' }}>
                        <p className="text-sm font-medium mb-1" style={{ color: '#F0B429' }}>Key Finding</p>
                        <p className="text-sm" style={{ color: 'rgba(242,247,241,0.8)' }}>{section.body.split("\n\n").pop()}</p>
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>

              <div className="mt-10 pt-6" style={{ borderTop: '1px solid #1F3326' }}>
                <p className="text-sm font-medium mb-3" style={{ color: '#F2F7F1' }}>Was this helpful?</p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors" aria-label="Thumbs up" style={{ border: '1px solid #1F3326', color: '#74917B' }}>
                    <ThumbsUp className="size-4" /> Yes
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors" aria-label="Thumbs down" style={{ border: '1px solid #1F3326', color: '#74917B' }}>
                    <ThumbsDown className="size-4" /> No
                  </button>
                </div>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
