import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import bcrypt from "bcryptjs"

const DATA_FILE = path.join(process.cwd(), "data", "users.json")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, password, ageRange, duration, frequency, reasons, inFacility, facilityName, tier } = body

    if (!fullName || !email || !password) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const raw = await fs.readFile(DATA_FILE, "utf-8")
    const users = JSON.parse(raw)

    const existing = users.find((u: { email: string }) => u.email === email)
    if (existing) {
      return NextResponse.json({ success: false, error: "An account with this email already exists" }, { status: 409 })
    }

    const user = {
      id: crypto.randomUUID(),
      fullName,
      email,
      password: hashedPassword,
      ageRange: ageRange || null,
      duration: duration || null,
      frequency: frequency || null,
      reasons: reasons || [],
      inFacility: inFacility || false,
      facilityName: facilityName || null,
      tier: tier || "mild",
      consentVersion: "1.0.0",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    users.push(user)
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      userId: user.id,
      tier: user.tier,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
