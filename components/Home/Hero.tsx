import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="relative pt-44 pb-32 px-4 overflow-hidden bg-white dark:bg-[#030712]">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-3xl h-[400px] bg-indigo-500/20 dark:bg-violet-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-purple-500/20 dark:bg-fuchsia-600/20 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="container relative mx-auto text-center max-w-5xl z-10">
        <div className="inline-flex items-center justify-center px-4 py-2 mb-8 text-sm font-medium rounded-full bg-indigo-50/80 text-indigo-700 ring-1 ring-inset ring-indigo-600/20 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/30 backdrop-blur-md">
          <span className="mr-2">✨</span> Experience the future of coding
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight bg-linear-to-br from-gray-900 via-indigo-800 to-purple-900 dark:from-white dark:via-violet-200 dark:to-fuchsia-400 bg-clip-text text-transparent leading-[1.1] md:leading-[1.1]">
          Your AI Coding Buddy
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
          Get intelligent code suggestions, instant bug fixes, and expert technical problem-solving assistance. <br className="hidden md:block"/>
          <span className="text-gray-900 dark:text-white font-medium">Level up your development with AI-powered guidance.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-4">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-medium bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl hover:shadow-indigo-500/25 dark:shadow-violet-500/20 dark:hover:shadow-violet-500/40 rounded-xl transition-all duration-300 hover:-translate-y-1 group">
              Start Coding
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/welcome" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-medium rounded-xl border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero