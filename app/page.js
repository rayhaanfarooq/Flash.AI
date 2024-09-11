'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap, BookOpen, Brain, Star, Check } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs";



export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session',{

      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },


    })

    const checkoutSessionJson = await checkoutSession.json()

    if(checkoutSessionJson.statusCode === 500){
      console.log('Error')

    }

    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,

    })

    if(error){
      console.warn(error.message)
    } 




  }


  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-blue-800">Flash.AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="/generate">
            Generate Flashcards
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="\flashcards">
            Study Flashcards
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="#">
            Pricing
          </Link>



          <SignedOut>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="/sign-in">
            Sign In
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="/sign-up">
            Sign Up
          </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

         
          
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-900">
                  Supercharge Your Learning with AI-Powered Flashcards
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-800 md:text-xl">
                  Flash.AI creates personalized flashcards using artificial intelligence, making your study sessions more efficient and effective than ever before.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started for Free</Button>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-900">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-blue-800">AI-Generated Content</h3>
                <p className="text-blue-700">Our AI creates accurate and relevant flashcards tailored to your study material.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Brain className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-blue-800">Adaptive Learning</h3>
                <p className="text-blue-700">Flash.AI adapts to your learning pace, focusing on areas where you need more practice.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-blue-800">Instant Flashcards</h3>
                <p className="text-blue-700">Generate flashcards instantly from any text, PDF, or web page.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-900">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-bold mb-2 text-blue-800">Input Your Material</h3>
                <p className="text-blue-700">Upload your study material or paste text directly into Flash.AI.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-bold mb-2 text-blue-800">AI Generation</h3>
                <p className="text-blue-700">Our AI analyzes the content and creates tailored flashcards.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-bold mb-2 text-blue-800">Start Learning</h3>
                <p className="text-blue-700">Review your AI-generated flashcards and boost your knowledge retention.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-900">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <Star className="h-6 w-6 text-yellow-500 mb-2" />
                <p className="text-blue-800 mb-4">Flash.AI has revolutionized the way I study. The AI-generated flashcards are spot-on and have helped me ace my exams!</p>
                <p className="font-bold text-blue-900">- Sarah K., Medical Student</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <Star className="h-6 w-6 text-yellow-500 mb-2" />
                <p className="text-blue-800 mb-4">As a language learner, Flash.AI has been a game-changer. It creates perfect flashcards for vocabulary and grammar!</p>
                <p className="font-bold text-blue-900">- Alex M., Language Enthusiast</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">Ready to Supercharge Your Learning?</h2>
            <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl/relaxed mb-8">
              Join thousands of students who are already benefiting from AI-powered flashcards.
            </p>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-blue-900">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col p-6 bg-blue-50 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">FlashBasic</h3>
                <p className="text-3xl font-bold text-blue-900 mb-6">Free</p>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-700">Basic AI-generated flashcards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-700">Up to 50 flashcards per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-700">Text input only</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-700">Basic progress tracking</span>
                  </li>
                </ul>
                <Button className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
              </div>
              <div className="flex flex-col p-6 bg-green-50 rounded-lg shadow-lg border-2 border-green-500 relative">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                  RECOMMENDED
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">FlashPro</h3>
                <p className="text-3xl font-bold text-green-900 mb-6">$9.99/month</p>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">Advanced AI-generated flashcards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">Unlimited flashcards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">Text, PDF, and web page input</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">Advanced progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">Customizable flashcard templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">Priority customer support</span>
                  </li>
                </ul>
                <Button className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit}>Upgrade to Pro</Button>
              </div>
            </div>
          </div>
        </section>
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
  
         
