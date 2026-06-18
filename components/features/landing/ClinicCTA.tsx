import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ClinicCTA() {
  return (
    <section
      id="for-clinics"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "#1A5C38" }}
      aria-label="For clinics"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cpath d='M150 30C200 30 250 70 270 130C290 190 270 250 220 280C170 310 100 300 60 260C20 220 10 160 30 110C50 60 100 30 150 30Z' fill='white' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "400px 400px",
          backgroundPosition: "center",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl mb-4" style={{ color: '#F2F7F1' }}>
          Are You a Treatment Facility?
        </h2>
        <p className="mx-auto max-w-2xl text-lg mb-8" style={{ color: 'rgba(242,247,241,0.8)' }}>
          White-label CannaClear for your patients. Comprehensive admin dashboard, progress tracking,
          and clinical reporting — all POPIA compliant.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/register">
            <Button
              size="lg"
              className="rounded-full px-8 py-3 text-base font-semibold" style={{ backgroundColor: '#F0B429', color: '#07100B' }}
            >
              Request a Demo
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button
              size="lg"
              variant="ghost"
              className="rounded-full border border-white/30 px-8 py-3 text-base" style={{ color: '#F2F7F1' }}
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
