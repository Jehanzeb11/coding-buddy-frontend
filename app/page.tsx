"use client"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Code } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import Hero from "@/components/Home/Hero"
import Features from "@/components/Home/Features"
import CTA from "@/components/Home/CTA"

export default function Home() {
  const observerRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8')
            entry.target.classList.add('opacity-100', 'translate-y-0')
          }
        })
      },
      { threshold: 0.1 }
    )

    const refs = [observerRef, featuresRef, ctaRef]
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.add('opacity-0', 'translate-y-8')
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code className="h-8 w-8 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 bg-clip-text text-transparent" />
            <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 bg-clip-text text-transparent">CodeBuddy</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transition-all duration-300 shadow-lg hover:shadow-xl">Sign Up</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero observerRef={observerRef} />

      {/* Features Section */}
      <Features featuresRef={featuresRef} />

      {/* CTA Section */}
      <CTA ctaRef={ctaRef} />
    </div>
  )
}

