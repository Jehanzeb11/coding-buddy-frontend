import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-[#071024] dark:via-[#2b0b3a] dark:to-[#3b0f2f]">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-20 dark:from-[#8b5cf6] dark:via-[#7c3aed] dark:to-[#ec4899]">
          Your AI Coding Buddy
        </h1>
        <p className="text-xl mb-8 max-w-4xl mx-auto text-muted-foreground dark:text-[#cbd6e8]">
          Get intelligent code suggestions, instant bug fixes, and expert technical problem-solving assistance.
          Level up your development with AI-powered guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="flex items-center text-lg px-6 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transition-all duration-300 shadow-lg hover:shadow-xl group dark:from-[#7c3aed] dark:to-[#8b5cf6] dark:shadow-[0_10px_30px_rgba(124,58,237,0.25)]">
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
  )
}

export default Hero