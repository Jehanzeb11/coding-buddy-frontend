import RegisterForm from "@/components/Auth/Forms/Register"
import { ThemeToggle } from "@/components/theme-toggle"
import React from "react"

// bg-background
const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4 bg-muted/50">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <RegisterForm />
    </div>
  )
}

export default Register