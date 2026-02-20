import RegisterForm from "@/components/Auth/Forms/Register"
import { ThemeToggle } from "@/components/theme-toggle"


const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-muted/50">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <RegisterForm />
    </div>
  )
}

export default Register