import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/Home/Hero"
import ScrollReveal from "@/components/Home/ScrollReveal"
import HomeSections from "@/components/Home/HomeSections"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* Critical Path: Loaded on Server */}
        <ScrollReveal>
          <Hero />
        </ScrollReveal>

        {/* Lazy Path: Loaded only on Client */}
        <HomeSections />
      </main>
    </div>
  )
}
