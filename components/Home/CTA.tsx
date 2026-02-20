import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const CTA = ({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement | null> }) => {
  return (
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
  )
}

export default CTA