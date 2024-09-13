'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap, BookOpen, Brain, Star, Check } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs";

export default function Pricing() {


  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSessionJson.statusCode === 500) {
      console.log('Error');
    }

    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 text-blue-900">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-blue-200">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center transition-transform hover:scale-105" href="/">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">Flash.AI</span>
          </Link>
          <nav className="flex gap-6">
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/generate">Generate Flashcards</Link>
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/flashcards">Study Flashcards</Link>
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/pricing">Pricing</Link>
            <SignedOut>
              <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/sign-in">Sign In</Link>
              <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/sign-up">Sign Up</Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 animate-gradient">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-center text-blue-800 mb-16 max-w-2xl mx-auto animate-fade-in">
              Unlock the full potential of AI-powered learning with our flexible pricing options.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">FlashBasic</h3>
                <p className="text-4xl font-bold text-blue-900 mb-6">Free</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "Basic AI-generated flashcards",
                    "Up to 50 flashcards per month",
                    "Text input only",
                    "Basic progress tracking"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up">
                <Button className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-full transition-all hover:shadow-lg">
                  Get Started
                </Button>
                </Link>
              </div>
              <div className="flex flex-col p-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 px-4 py-1 rounded-bl-lg text-sm font-semibold">
                  RECOMMENDED
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">FlashPro</h3>
                <p className="text-4xl font-bold text-white mb-6">$9.99/month</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "Advanced AI-generated flashcards",
                    "Unlimited flashcards",
                    "Text, PDF, and web page input",
                    "Advanced progress tracking",
                    "Customizable flashcard templates",
                    "Priority customer support"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-auto bg-white text-blue-600 hover:bg-blue-100 text-lg py-3 rounded-full transition-all hover:shadow-lg animate-pulse"
                  onClick={handleSubmit}
                >
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2023 Flash.AI. All rights reserved.</p>
          <nav className="flex gap-6 mt-4 sm:mt-0">
            <Link className="text-sm hover:text-blue-300 transition-colors" href="#">Terms of Service</Link>
            <Link className="text-sm hover:text-blue-300 transition-colors" href="#">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
