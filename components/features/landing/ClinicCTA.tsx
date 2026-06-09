import { Button } from "@/components/ui/button"

export default function ClinicCTA() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "hsl(var(--primary))" }}
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
        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-4">
          Are You a Treatment Facility?
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-primary-foreground/80 mb-8">
          White-label CannaClear for your patients. Comprehensive admin dashboard, progress tracking,
          and clinical reporting — all POPIA compliant.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-base font-semibold"
          >
            Request a Demo
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full border border-white/30 text-primary-foreground hover:bg-white/10 px-8 py-3 text-base"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
