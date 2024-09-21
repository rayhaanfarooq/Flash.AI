'use client'
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { Zap, BookOpen, Brain, Star, Menu } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center transition-transform hover:scale-105" href="#">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Flash.AI</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavLinks />
          </nav>
          <button className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white">
            <nav className="flex flex-col items-center py-4 gap-4">
              <NavLinks />
            </nav>
          </div>
        )}
      </header>
      
      <main className="flex-1">
        <section className="w-full py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Supercharge</span> Your Learning with AI-Powered Flashcards
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-gray-600">
                Flash.AI creates personalized flashcards using artificial intelligence, making your study sessions more efficient and effective than ever before.
              </p>
              <SignedOut>
                <Link href="/sign-up">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-3 rounded-full transition-all hover:shadow-lg">
                    Get Started for Free
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </div>
        </section>
        
        <section className="w-full py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Key Features</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: BookOpen, title: "AI-Generated Content", description: "Our AI creates accurate and relevant flashcards tailored to your study material." },
                { icon: Brain, title: "Adaptive Learning", description: "Flash.AI adapts to your learning pace, focusing on areas where you need more practice." },
                { icon: Zap, title: "Instant Flashcards", description: "Generate flashcards instantly from any text, PDF, or web page." }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow group">
                  <feature.icon className="h-16 w-16 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-24 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">How It Works</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: 1, title: "Input Your Material", description: "Upload your study material or paste text directly into Flash.AI." },
                { step: 2, title: "AI Generation", description: "Our AI analyzes the content and creates tailored flashcards." },
                { step: 3, title: "Start Learning", description: "Review your AI-generated flashcards and boost your knowledge retention." }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-8">Ready to Supercharge Your Learning?</h2>
            <p className="mx-auto max-w-[600px] text-xl mb-12">
              Join thousands of students who are already benefiting from AI-powered flashcards.
            </p>
            <Link href="/sign-up">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 rounded-full transition-all hover:shadow-lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="py-6 bg-gray-100 text-gray-600">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2023 Flash.AI. All rights reserved.</p>
          <nav className="flex gap-6 mt-4 sm:mt-0">
            <Link className="text-sm hover:text-blue-600 transition-colors" href="#">Terms of Service</Link>
            <Link className="text-sm hover:text-blue-600 transition-colors" href="#">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}