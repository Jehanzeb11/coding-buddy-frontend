import RegisterForm from "@/components/Auth/Forms/Register"
import { ThemeToggle } from "@/components/theme-toggle"
import React from "react"

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-[#030712] relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-3xl h-[400px] bg-indigo-500/20 dark:bg-violet-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-purple-500/20 dark:bg-fuchsia-600/20 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register