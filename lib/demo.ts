export const DEMO_USER = {
  id: "demo-001",
  name: "Sipho Dlamini",
  firstName: "Sipho",
  email: "sipho@demo.cannaclear.co.za",
  tier: "moderate" as const,
  dayInProgram: 14,
  currentWeek: 2,
  streak: 14,
  isInFacility: true,
  facilityName: "White River Manor Recovery Centre",
  badges: ["day-1", "day-3", "day-7", "day-14"],
  moodHistory: [6, 5, 7, 6, 8, 7, 7, 8, 6, 9, 7, 8, 8, 9],
  cravingHistory: [8, 9, 7, 8, 6, 7, 5, 6, 5, 4, 5, 4, 3, 3],
  sleepHistory: [5.5, 6.0, 7.2, 6.8, 7.5, 8.0, 6.5, 7.0, 7.2, 7.8, 7.5, 8.2, 7.9, 8.0],
  hydrationToday: 4,
  checkInDoneToday: false,
  journalEntries: 7,
  lessonsComplete: 8,
  programProgress: 40,
}

export const DEMO_ADMIN = {
  id: "admin-001",
  name: "Dr. Naledi Sithole",
  role: "Clinical Director",
  facility: "White River Manor Recovery Centre",
}

export type DemoUser = typeof DEMO_USER
export type DemoAdmin = typeof DEMO_ADMIN
