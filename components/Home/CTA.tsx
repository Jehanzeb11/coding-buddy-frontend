import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const CTA: React.FC = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-[#030712] -z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-indigo-500/10 dark:bg-violet-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-2xl dark:shadow-none backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-violet-500/10 dark:via-transparent dark:to-fuchsia-500/10 pointer-events-none" />
          
          <div className="relative p-10 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-linear-to-r from-gray-900 to-indigo-800 dark:from-white dark:to-violet-200 bg-clip-text text-transparent">
              Ready to Transform Your Coding Experience?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of developers who are already building faster, smarter, and more securely with CodeBuddy.
            </p>
            <div className="w-full flex justify-center">
              <Link href="/register">
                <Button size="lg" className="flex items-center text-lg px-8 py-7 h-auto bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl shadow-xl hover:shadow-indigo-500/25 dark:shadow-violet-500/25 dark:hover:shadow-violet-500/40 transition-all duration-300 hover:-translate-y-1 group">
                  <span className="font-medium mr-2">Get Started for Free</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA