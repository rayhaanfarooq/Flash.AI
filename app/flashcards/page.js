'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDoc, setDoc, doc, CollectionReference, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, ArrowRight } from "lucide-react"


export default function Flashcards(){
    const { isLoaded, isSignedIn, user}  = useUser();
    const [flashcards, setFlashcards] = useState([]);
    // const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchFlashcards = async () => {
            if(!user) return

            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)



            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                console.log(collections)
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }

        fetchFlashcards()

      
    }, [user])

    console.log(isSignedIn)

    if(!isSignedIn) return <p>Sign in to view your flashcards</p>


    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (

        <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Your Flashcard Sets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((flashcard, index) => (
            <Card 
              key={index}
              className={`group cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105`}
              onClick={() => handleCardClick(flashcard.name)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-blue-800 group-hover:text-blue-600 transition-colors duration-300">
                    {flashcard.name}
                  </h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {flashcard.cardCount} cards
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Last reviewed: {flashcard.lastReviewed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-green-600">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span className="font-medium">Start Review</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                   'transform translate-x-2 text-blue-600'
                  }`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
}


{/* <CardActionArea onClick = {() => handleCardClick(flashcard.name)}> */}








