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
    <header className="fixed left-0 right-0 top-4 z-50 w-[95%] max-w-7xl mx-auto h-20 rounded-2xl border border-white/40 dark:border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-3xl backdrop-saturate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300">
      <div className="px-6 md:px-8 h-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group transition-all duration-300 hover:opacity-80">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="CodeBuddy Logo"
              width={160}
              height={50}
              priority
              quality={100}
              className="object-contain w-auto h-12 md:h-14 drop-shadow-sm"
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
                <Button size="sm" className="bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg shadow-md hover:shadow-indigo-500/25 dark:shadow-violet-500/20 dark:hover:shadow-violet-500/40 transition-all duration-300">Sign Up</Button>
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
