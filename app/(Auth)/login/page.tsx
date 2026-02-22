import LoginForm from "@/components/Auth/Forms/Login"
import { ThemeToggle } from "@/components/theme-toggle"
import React from "react"

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/50">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <LoginForm />
    </div>
  )
}

export default Login