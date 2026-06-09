"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Leaf, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TermsDialog } from "@/components/features/auth/TermsDialog"
import { useRouter } from "next/navigation"

const step1Schema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    consent: z.literal(true, { message: "You must accept the Terms of Service" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const reasons = [
  "Sleep problems",
  "Anxiety",
  "Motivation issues",
  "Relationship strain",
  "Work performance",
  "Health concerns",
  "Personal goal",
  "Recommended by clinic",
] as const

type Step1Data = z.infer<typeof step1Schema>

function getSeverityTier(frequency: string, duration: string) {
  const freqMap: Record<string, number> = {
    "Occasionally (1-2×/week)": 1,
    "Regularly (3-5×/week)": 2,
    Daily: 3,
    "Multiple times daily": 4,
  }
  const durMap: Record<string, number> = {
    "Less than 6 months": 1,
    "6-12 months": 1,
    "1-2 years": 2,
    "3-5 years": 3,
    "5+ years": 3,
  }
  const freqScore = freqMap[frequency] || 1
  const durScore = durMap[duration] || 1
  const total = freqScore + durScore
  if (total <= 3) return "mild"
  if (total <= 5) return "moderate"
  return "heavy"
}

export default function RegisterForm() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const router = useRouter()

  const [ageRange, setAgeRange] = useState("")
  const [duration, setDuration] = useState("")
  const [frequency, setFrequency] = useState("")
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [inFacility, setInFacility] = useState(false)
  const [facilityName, setFacilityName] = useState("")

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { consent: false as unknown as true },
  })

  const onStep1 = async () => {
    const valid = await trigger()
    if (valid) setStep(2)
  }

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    )
  }

  const onSubmit = async () => {
    if (!ageRange || !duration || !frequency) return
    setApiError("")
    setLoading(true)

    const step1 = getValues()

    const tier = getSeverityTier(frequency, duration)

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: step1.fullName,
          email: step1.email,
          password: step1.password,
          ageRange,
          duration,
          frequency,
          reasons: selectedReasons,
          inFacility,
          facilityName: inFacility ? facilityName : undefined,
          tier,
          consentVersion: "1.0.0",
        }),
      })

      const data = await res.json()
      if (!data.success) {
        setApiError(data.error || "Registration failed")
        setLoading(false)
        return
      }

      router.push("/onboarding")
    } catch {
      setApiError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const reasonsError = selectedReasons.length === 0 && step === 2

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/30">
          <Leaf className="size-7 text-green-300" />
        </div>
        <h1 className="text-2xl font-semibold text-white">
          {step === 1 ? "Create Your Account" : "Tell Us About Yourself"}
        </h1>
        {step === 2 && (
          <p className="mt-2 text-sm text-white/50 max-w-sm">
            This helps us personalise your recovery program. Your answers are private and POPIA protected.
          </p>
        )}
        <div className="mt-3 flex gap-1.5">
          <span className={`size-2 rounded-full ${step === 1 ? "bg-accent" : "bg-white/20"}`} />
          <span className={`size-2 rounded-full ${step === 2 ? "bg-accent" : "bg-white/20"}`} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        {step === 1 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm text-white/80">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                aria-label="Full Name"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-green-400/50"
                placeholder="Thabo Mokoena"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-destructive">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email" className="text-sm text-white/80">
                Email Address
              </Label>
              <Input
                id="reg-email"
                type="email"
                autoComplete="email"
                aria-label="Email Address"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-green-400/50"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-password" className="text-sm text-white/80">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-label="Password"
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-green-400/50 pr-10"
                  placeholder="Min. 8 characters"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm text-white/80">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  aria-label="Confirm Password"
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-green-400/50 pr-10"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                id="consent"
                type="checkbox"
                className="mt-1 size-4 accent-accent"
                {...register("consent")}
              />
              <Label htmlFor="consent" className="text-sm text-white/60 leading-relaxed">
                I have read and agree to the <TermsDialog /> and{" "}
                <button
                  type="button"
                  className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
                >
                  Privacy Policy
                </button>
              </Label>
            </div>
            {errors.consent && (
              <p className="text-xs text-destructive">{errors.consent.message}</p>
            )}

            <Button
              type="button"
              onClick={onStep1}
              className="mt-2 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-semibold"
            >
              Continue
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="ageRange" className="text-sm text-white/80">
                Age Range
              </Label>
              <Select value={ageRange} onValueChange={(v) => v && setAgeRange(v)}>
                <SelectTrigger className="w-full border-white/20 bg-white/5 text-white data-placeholder:text-white/30">
                  <SelectValue placeholder="Select your age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35-44">35-44</SelectItem>
                  <SelectItem value="45-54">45-54</SelectItem>
                  <SelectItem value="55+">55+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm text-white/80">
                How long have you been using cannabis?
              </Label>
              <Select value={duration} onValueChange={(v) => v && setDuration(v)}>
                <SelectTrigger className="w-full border-white/20 bg-white/5 text-white data-placeholder:text-white/30">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Less than 6 months">Less than 6 months</SelectItem>
                  <SelectItem value="6-12 months">6-12 months</SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="5+ years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency" className="text-sm text-white/80">
                How often do you currently use?
              </Label>
              <Select value={frequency} onValueChange={(v) => v && setFrequency(v)}>
                <SelectTrigger className="w-full border-white/20 bg-white/5 text-white data-placeholder:text-white/30">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Occasionally (1-2×/week)">Occasionally (1-2×/week)</SelectItem>
                  <SelectItem value="Regularly (3-5×/week)">Regularly (3-5×/week)</SelectItem>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Multiple times daily">Multiple times daily</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-white/80">
                What brings you here? <span className="text-white/40">(select all that apply)</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {reasons.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => toggleReason(reason)}
                    className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
                      selectedReasons.includes(reason)
                        ? "bg-accent/20 border-accent text-accent"
                        : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/80"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
              {reasonsError && (
                <p className="text-xs text-destructive">Please select at least one reason</p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border border-white/10 p-4">
              <div>
                <Label htmlFor="inFacility" className="text-sm text-white/80">
                  Currently in a residential facility?
                </Label>
                <p className="text-xs text-white/40">Select yes if you are currently admitted</p>
              </div>
              <Switch
                id="inFacility"
                checked={inFacility}
                onCheckedChange={(c: boolean) => setInFacility(c)}
              />
            </div>

            {inFacility && (
              <div className="space-y-2">
                <Label htmlFor="facilityName" className="text-sm text-white/80">
                  Facility name <span className="text-white/40">(optional)</span>
                </Label>
                <Input
                  id="facilityName"
                  type="text"
                  aria-label="Facility name"
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-green-400/50"
                  placeholder="e.g. White River Manor"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                />
              </div>
            )}

            {apiError && (
              <div
                className="rounded-lg bg-destructive/15 border border-destructive/30 px-4 py-2 text-sm text-destructive"
                role="alert"
              >
                {apiError}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(1)}
                className="rounded-full border border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="size-4 mr-1" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading || !ageRange || !duration || !frequency || selectedReasons.length === 0}
                className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-semibold"
              >
                {loading ? <Loader2 className="size-5 animate-spin" /> : "Create My Account"}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
