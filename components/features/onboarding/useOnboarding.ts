import { create } from "zustand"

interface OnboardingState {
  currentStep: number
  userTier: "mild" | "moderate" | "heavy"
  firstName: string
  isInFacility: boolean
  facilityName: string
  nextStep: () => void
  prevStep: () => void
  goToStep: (n: number) => void
}

export const useOnboarding = create<OnboardingState>((set) => ({
  currentStep: 1,
  userTier: "moderate",
  firstName: "",
  isInFacility: false,
  facilityName: "",
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 7) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  goToStep: (n) => set({ currentStep: n }),
}))
