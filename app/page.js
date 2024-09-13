'use client'
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { Zap, BookOpen, Brain, Star } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 text-blue-900">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-blue-200">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center transition-transform hover:scale-105" href="#">
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
            <div className="flex flex-col items-center space-y-8 text-center">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 animate-gradient">
                Supercharge Your Learning with AI-Powered Flashcards
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-blue-800 animate-fade-in">
                Flash.AI creates personalized flashcards using artificial intelligence, making your study sessions more efficient and effective than ever before.
              </p>
              <SignedOut>
                <Link href="/sign-up">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full transition-all hover:shadow-lg animate-bounce">
                    Get Started for Free
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </div>
        </section>
        
        <section className="w-full py-24 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: BookOpen, title: "AI-Generated Content", description: "Our AI creates accurate and relevant flashcards tailored to your study material." },
                { icon: Brain, title: "Adaptive Learning", description: "Flash.AI adapts to your learning pace, focusing on areas where you need more practice." },
                { icon: Zap, title: "Instant Flashcards", description: "Generate flashcards instantly from any text, PDF, or web page." }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow group">
                  <feature.icon className="h-16 w-16 text-green-600 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">{feature.title}</h3>
                  <p className="text-blue-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-24 bg-gradient-to-r from-blue-100 to-green-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: 1, title: "Input Your Material", description: "Upload your study material or paste text directly into Flash.AI." },
                { step: 2, title: "AI Generation", description: "Our AI analyzes the content and creates tailored flashcards." },
                { step: 3, title: "Start Learning", description: "Review your AI-generated flashcards and boost your knowledge retention." }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">{item.title}</h3>
                  <p className="text-blue-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* <section className="w-full py-24 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { quote: "Flash.AI has revolutionized the way I study. The AI-generated flashcards are spot-on and have helped me ace my exams!", author: "Sarah K., Medical Student" },
                { quote: "As a language learner, Flash.AI has been a game-changer. It creates perfect flashcards for vocabulary and grammar!", author: "Alex M., Language Enthusiast" }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <Star className="h-8 w-8 text-yellow-500 mb-4" />
                  <p className="text-blue-800 mb-6 text-lg italic">{testimonial.quote}</p>
                  <p className="font-bold text-blue-900">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
         */}
        <section className="w-full py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-8">Ready to Supercharge Your Learning?</h2>
            <p className="mx-auto max-w-[600px] text-xl mb-12">
              Join thousands of students who are already benefiting from AI-powered flashcards.
            </p>
            <Link href="/sign-up">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 rounded-full transition-all hover:shadow-lg animate-pulse">
              Get Started Now
            </Button>
            </Link>
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
  )
}

