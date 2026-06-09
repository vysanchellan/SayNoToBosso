import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "next-themes"
import { DemoProvider } from "@/lib/demo-context"
import DemoBanner from "@/components/features/demo/DemoBanner"
import PageTransition from "@/components/ui/PageTransition"

export const metadata: Metadata = {
  title: "CannaClear — Your guided path to cannabis-free living",
  description: "A clinically guided, week-by-week cannabis recovery platform. Built for South Africa.",
  keywords: "cannabis recovery, rehabilitation, South Africa, addiction support",
  openGraph: {
    title: "CannaClear",
    description: "Your guided path to cannabis-free living",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium">
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DemoProvider>
            <DemoBanner />
            <PageTransition>{children}</PageTransition>
          </DemoProvider>
        </ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: "text-sm font-medium",
            style: {
              border: "1px solid hsl(40 20% 85%)",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  )
}
