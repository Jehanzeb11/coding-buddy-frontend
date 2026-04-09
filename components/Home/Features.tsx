import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Code, Lightbulb, MessageCircle, Shield, Wrench, Zap } from 'lucide-react'

const Features: React.FC = () => {
  return (
    <section className="relative py-24 px-4 bg-gray-50/50 dark:bg-[#030712] overflow-hidden">
      {/* Subtle background pattern/glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 dark:bg-violet-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Everything you need to code faster, smarter, and better. <br className="hidden md:block" />
            Designed for modern development workflows.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="relative overflow-hidden border-gray-200/60 dark:border-white/10 shadow-lg hover:shadow-xl dark:shadow-none bg-white dark:bg-white/5 dark:backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5 dark:from-violet-500/10 dark:to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader>
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 dark:bg-violet-500/20 dark:text-violet-300 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Technical Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Get intelligent recommendations for best practices, design patterns, and optimal solutions for your code.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-gray-200/60 dark:border-white/10 shadow-lg hover:shadow-xl dark:shadow-none bg-white dark:bg-white/5 dark:backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader>
              <div className="w-14 h-14 bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Code className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Code Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Receive context-aware code completions and suggestions that match your coding style and project requirements.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-gray-200/60 dark:border-white/10 shadow-lg hover:shadow-xl dark:shadow-none bg-white dark:bg-white/5 dark:backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-rose-500/5 to-orange-500/5 dark:from-rose-500/10 dark:to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader>
              <div className="w-14 h-14 bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Wrench className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Code Fixes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Instantly identify and fix bugs, security vulnerabilities, and performance issues in your codebase.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-gray-200/60 dark:border-white/10 shadow-lg hover:shadow-xl dark:shadow-none bg-white dark:bg-white/5 dark:backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader>
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Problem Solving</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Get step-by-step guidance for complex technical problems and algorithmic challenges.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-gray-200/60 dark:border-white/10 shadow-lg hover:shadow-xl dark:shadow-none bg-white dark:bg-white/5 dark:backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-yellow-500/5 dark:from-amber-500/10 dark:to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader>
              <div className="w-14 h-14 bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Get instant responses and real-time assistance to keep your coding flow uninterrupted.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-gray-200/60 dark:border-white/10 shadow-lg hover:shadow-xl dark:shadow-none bg-white dark:bg-white/5 dark:backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-fuchsia-500/5 to-pink-500/5 dark:from-fuchsia-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader>
              <div className="w-14 h-14 bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Your code is processed securely with enterprise-grade encryption and privacy protection.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Features
