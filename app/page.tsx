"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Code, Lightbulb, Wrench, MessageCircle, Zap, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

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
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transition-all duration-300 shadow-lg hover:shadow-xl">Get Started</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={observerRef} className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-20">
            Your AI Coding Buddy
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Get intelligent code suggestions, instant bug fixes, and expert technical problem-solving assistance. 
            Level up your development with AI-powered guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="flex items-center text-lg px-6 py-6 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <span className="transition-all duration-300 group-hover:mr-1">Start Coding</span> 
                <ArrowRight className="h-5 w-5 transition-all duration-500 group-hover:translate-x-1" />
              </Button>
            </Link>
            {/* <Link href="/welcome">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 cursor-pointer border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                Learn More
              </Button>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 bg-gradient-to-br bg-muted/50 opacity-0 translate-y-8 transition-all duration-[2s] ease-in-out">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to code faster, smarter, and better
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-800 dark:to-gray-700 group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Technical Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Get intelligent recommendations for best practices, design patterns, and optimal solutions for your code.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-800 dark:to-gray-700 group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Code Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Receive context-aware code completions and suggestions that match your coding style and project requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-800 dark:to-gray-700 group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Code Fixes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Instantly identify and fix bugs, security vulnerabilities, and performance issues in your codebase.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-800 dark:to-gray-700 group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Problem Solving</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Get step-by-step guidance for complex technical problems and algorithmic challenges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-800 dark:to-gray-700 group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Get instant responses and real-time assistance to keep your coding flow uninterrupted.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-800 dark:to-gray-700 group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Your code is processed securely with enterprise-grade encryption and privacy protection.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-4 transition-all duration-1000 ease-out">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-12">
            Ready to Transform Your Coding Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers who are already coding smarter with CodeBuddy.
          </p>
          <div className="w-full flex justify-center">

          <Link href="/register">
            <Button size="lg" className="flex items-center text-lg px-8 py-6 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transition-all duration-300 shadow-lg hover:shadow-xl group">
              <span className="ransition-all duration-300 group-hover:mr-1">Get Started Free</span> <ArrowRight className="h-5 w-5 transition-all duration-500 group-hover:translate-x-1" />
            </Button>
          </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

