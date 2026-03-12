import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

import { verifySession } from "@/lib/session"
import LogoutButton from "./LogoutButton"

export default async function Navbar() {
  const { isAuth } = await verifySession();

  return (
    <header className="border-b bg-linear-to-r from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-opacity-80 h-24">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group transition-all duration-300">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="CodeBuddy Logo"
              width={180}
              height={60}
              priority
              quality={100}
              className="object-contain w-auto h-18"
            />
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          {!isAuth ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transition-all duration-300 shadow-lg hover:shadow-xl">Sign Up</Button>
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
