"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Leaf, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async () => {
    setError("")
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setError("Invalid email or password. Please try again.")
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/30">
          <Leaf className="size-7 text-green-300" />
        </div>
        <h1 className="text-2xl font-semibold text-white">Welcome Back</h1>
        <p className="mt-1 text-sm text-white/60">Continue your recovery journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-white/80">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-label="Email address"
            className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-green-400/50"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm text-white/80">
              Password
            </Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-label="Password"
              className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-green-400/50 pr-10"
              placeholder="Enter your password"
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

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-accent hover:text-accent/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/15 border border-destructive/30 px-4 py-2 text-sm text-destructive" role="alert">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-semibold"
        >
          {loading ? <Loader2 className="size-5 animate-spin" /> : "Sign In"}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
        </div>

        <p className="text-center text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-accent hover:text-accent/80 transition-colors font-medium"
          >
            Create one here
          </Link>
        </p>
      </form>
    </div>
  )
}
