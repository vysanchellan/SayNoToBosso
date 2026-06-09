import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/features/landing/Hero"
import StatsBanner from "@/components/features/landing/StatsBanner"
import HowItWorks from "@/components/features/landing/HowItWorks"
import FeatureGrid from "@/components/features/landing/FeatureGrid"
import Testimonial from "@/components/features/landing/Testimonial"
import ClinicCTA from "@/components/features/landing/ClinicCTA"
import Footer from "@/components/layout/Footer"
import POPIABanner from "@/components/features/landing/POPIABanner"
import { APP_NAME } from "@/lib/constants"

export const metadata = {
  title: `${APP_NAME} — Your guided path to cannabis-free living`,
  description:
    "A clinically guided, week-by-week recovery program built for real people. Sleep better, think clearer, feel whole again.",
}

export default function LandingPage() {
  return (
    <div id="main-content">
      <Navbar />
      <Hero />
      <StatsBanner />
      <HowItWorks />
      <FeatureGrid />
      <Testimonial />
      <ClinicCTA />
      <Footer />
      <POPIABanner />
    </div>
  )
}
