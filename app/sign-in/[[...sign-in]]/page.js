import { SignIn } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Zap className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-blue-800">Flash.AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="/sign-in">
            Login
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="/sign-up">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-blue-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-blue-700">
              Or{' '}
              <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>
          <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <SignIn />
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-blue-50">
        <p className="text-xs text-blue-800">© 2023 Flash.AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-blue-800" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-blue-800" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}