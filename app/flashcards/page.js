"use client";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDoc, setDoc, doc, collection } from 'firebase/firestore';
import { db } from '@/firebase';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    };
    fetchFlashcards();
  }, [user]);

  if (!isSignedIn) return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <Card className="w-96 text-center p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Flashcards</h2>
        <p className="text-gray-600 mb-6">Please sign in to view and manage your flashcard sets.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
          Sign In
        </button>
      </Card>
    </div>
  );

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Your Flashcard Sets
        </h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {flashcards.map((flashcard, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="h-full cursor-pointer bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 ease-in-out"
                onClick={() => handleCardClick(flashcard.name)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {flashcard.name}
                    </h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {flashcard.cardCount} cards
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Last reviewed: {flashcard.lastReviewed}</span>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center text-green-600">
                      <BookOpen className="w-5 h-5 mr-2" />
                      <span className="font-medium">Start Review</span>
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                      hoveredCard === index ? 'transform translate-x-2 text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className="h-full cursor-pointer bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border-2 border-dashed border-gray-300 hover:border-blue-300 transition-all duration-300 ease-in-out flex items-center justify-center"
              onClick={() => router.push('/generate')}
            >
              <CardContent className="text-center">
                <Plus className="w-12 h-12 text-gray-400 mb-2 mx-auto" />
                <p className="text-lg font-medium text-gray-600">Create New Flashcard Set</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}