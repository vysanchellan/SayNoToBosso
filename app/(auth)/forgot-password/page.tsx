"use client"

import { useState } from "react"
import AuthLayout from "@/components/features/auth/AuthLayout"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <div id="main-content">
      <AuthLayout>
        <div className="w-full max-w-sm mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter your email to receive a reset link.</p>
          </div>

          {sent ? (
            <div className="rounded-2xl border bg-green-50 p-6 text-center">
              <p className="text-sm font-medium text-green-700">If this email exists, a reset link has been sent.</p>
              <p className="text-xs text-green-600 mt-2">Please check your inbox and follow the instructions.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-muted-foreground/20 bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button
                onClick={() => setSent(true)}
                disabled={!email.includes("@")}
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Send Reset Link
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                <a href="/login" className="text-primary hover:underline">Back to Sign In</a>
              </p>
            </div>
          )}
        </div>
      </AuthLayout>
    </div>
  )
}
