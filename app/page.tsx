import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Well</span>Check
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 space-y-8 md:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Team Management & Wellbeing in One Place
            </h1>
            <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
              Track team mood, manage projects, and improve workplace wellbeing with our comprehensive platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl">Key Features</h2>
              <p className="text-muted-foreground">
                WellCheck provides everything you need to manage your team and monitor wellbeing.
              </p>
              <ul className="grid gap-4">
                {[
                  "Role-based access for admins and members",
                  "Team and project management",
                  "Daily check-ins with mood tracking",
                  "Team mood visualization dashboard",
                  "Automatic wellbeing recommendations",
                  "Push notifications for important events",
                  "Comprehensive absence reporting",
                  "Weekly mood analysis with insights",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-8 shadow-sm">
              <div className="aspect-video w-full rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground">
                Dashboard Preview
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-primary">Well</span>Check
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WellCheck. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
