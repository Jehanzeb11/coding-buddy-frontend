import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Code, Lightbulb, MessageCircle, Shield, Wrench, Zap } from 'lucide-react'

const Features: React.FC = () => {
  return (
  <section className="py-20 px-4 bg-muted/50 dark:from-[#050617] dark:via-[#0b0b1f] dark:to-[#16061f]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-[#9b7cf8] dark:via-[#7c3aed] dark:to-[#ff7ab6]">Powerful Features</h2>
            <p className="text-xl max-w-2xl mx-auto text-muted-foreground dark:text-[#cfe6ff]">
              Everything you need to code faster, smarter, and better
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-linear-to-br from-white via-gray-50 to-indigo-50 dark:bg-linear-to-br dark:from-[#081227] dark:via-[#0b1130] dark:to-[#081227] dark:border dark:border-neutral-800 dark:shadow-[0_10px_30px_rgba(124,58,237,0.14)] group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg dark:from-[#7c3aed] dark:to-[#8b5cf6] dark:shadow-[0_6px_20px_rgba(140,92,246,0.28)]">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Technical Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-200">
                  Get intelligent recommendations for best practices, design patterns, and optimal solutions for your code.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-linear-to-br from-white via-gray-50 to-indigo-50 dark:bg-linear-to-br dark:from-[#081227] dark:via-[#0b1130] dark:to-[#081227] dark:border dark:border-neutral-800 dark:shadow-[0_8px_26px_rgba(124,58,237,0.12)] group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 dark:from-[#7c3aed] dark:to-[#8b5cf6] dark:shadow-[0_6px_18px_rgba(124,58,237,0.22)]">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Code Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-200">
                  Receive context-aware code completions and suggestions that match your coding style and project requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-linear-to-br from-white via-gray-50 to-indigo-50 dark:bg-linear-to-br dark:from-[#081227] dark:via-[#0b1130] dark:to-[#081227] dark:border dark:border-neutral-800 dark:shadow-[0_8px_26px_rgba(124,58,237,0.12)] group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 dark:from-[#7c3aed] dark:to-[#8b5cf6] dark:shadow-[0_6px_18px_rgba(124,58,237,0.22)]">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Code Fixes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-200">
                  Instantly identify and fix bugs, security vulnerabilities, and performance issues in your codebase.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-linear-to-br from-white via-gray-50 to-indigo-50 dark:bg-linear-to-br dark:from-[#081227] dark:via-[#0b1130] dark:to-[#081227] dark:border dark:border-neutral-800 dark:shadow-[0_8px_26px_rgba(124,58,237,0.12)] group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 dark:from-[#7c3aed] dark:to-[#8b5cf6] dark:shadow-[0_6px_18px_rgba(124,58,237,0.22)]">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Problem Solving</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-200">
                  Get step-by-step guidance for complex technical problems and algorithmic challenges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-linear-to-br from-white via-gray-50 to-indigo-50 dark:bg-linear-to-br dark:from-[#081227] dark:via-[#0b1130] dark:to-[#081227] dark:border dark:border-neutral-800 dark:shadow-[0_8px_26px_rgba(124,58,237,0.12)] group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 dark:from-[#7c3aed] dark:to-[#8b5cf6] dark:shadow-[0_6px_18px_rgba(124,58,237,0.22)]">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-200">
                  Get instant responses and real-time assistance to keep your coding flow uninterrupted.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-linear-to-br from-white via-gray-50 to-indigo-50 dark:bg-linear-to-br dark:from-[#081227] dark:via-[#0b1130] dark:to-[#081227] dark:border dark:border-neutral-800 dark:shadow-[0_8px_26px_rgba(124,58,237,0.12)] group hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 dark:from-[#7c3aed] dark:to-[#8b5cf6] dark:shadow-[0_6px_18px_rgba(124,58,237,0.22)]">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-200">
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
