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
       
    )

}