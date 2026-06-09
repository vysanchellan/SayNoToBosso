"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { DEMO_USER, DEMO_ADMIN, type DemoUser, type DemoAdmin } from "@/lib/demo"

interface DemoContextType {
  isDemo: boolean
  user: DemoUser
  admin: DemoAdmin
}

const DemoContext = createContext<DemoContextType | null>(null)

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error("useDemo must be used within DemoProvider")
  return ctx
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemo] = useState(true)

  return (
    <DemoContext.Provider value={{ isDemo, user: DEMO_USER, admin: DEMO_ADMIN }}>
      {children}
    </DemoContext.Provider>
  )
}
