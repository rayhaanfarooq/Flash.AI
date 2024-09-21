"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, BarChart2, BookOpen, Zap, LogOut, Menu } from "lucide-react";

const FlashcardApp = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const navItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Flashcards', icon: BookOpen, href: '/flashcards' },
    { name: 'Generate', icon: Zap, href: '/generate' },
  ];

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const fetchedFlashcards = [];

      docs.forEach((doc) => {
        fetchedFlashcards.push({ id: doc.id, ...doc.data() });
      });

      setFlashcards(fetchedFlashcards);
    };

    fetchFlashcards();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Sidebar */}
      <div className={`bg-white bg-opacity-80 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Flash.AI
          </h1>
          <nav className="space-y-4">
            {navItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <Button
                  className="w-full justify-start text-left"
                  variant="ghost"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Button className="w-full justify-start text-left" variant="ghost">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white bg-opacity-70 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">Flashcards</h2>
            <Button onClick={toggleSidebar} variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {flashcards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((flashcard, index) => (
                <div
                  key={index}
                  className="flip-card h-64 w-full cursor-pointer perspective group"
                  onClick={() => handleCardClick(index)}
                >
                  <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped[index] ? 'rotate-y-180' : ''}`}>
                    <div className="flip-card-front absolute w-full h-full backface-hidden rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <p className="text-xl font-medium text-white text-center">{flashcard.front}</p>
                      </div>
                    </div>
                    <div className="flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-lg overflow-hidden rotate-y-180 bg-gradient-to-br from-green-400 to-teal-500">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <p className="text-xl font-medium text-white text-center">{flashcard.back}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-12">
              <p className="text-xl text-gray-600">No flashcards available. Start by creating some!</p>
              <Button className="mt-4" variant="default">
                <Zap className="mr-2 h-4 w-4" />
                Generate Flashcards
              </Button>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        .perspective { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashcardApp;