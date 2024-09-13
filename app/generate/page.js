"use client";

import { useUser } from "@clerk/nextjs";
import { writeBatch, getDoc, doc, collection, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { useState } from "react";
import Link from "next/link";
import { Zap, BookOpen, Brain, Star, Check, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    fetch("/api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data))
      .catch((err) => console.log("error" + err));
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name for your flashcards");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collection = docSnap.data().flashcards || [];
      if (collection.find((f) => f.name === name)) {
        alert("You already have flashcards with that name");
        return;
      } else {
        collection.push({ name });
        batch.set(userDocRef, { flashcards: collection }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100">
      {/* Sidebar */}
      <div className="w-64 bg-white/80 backdrop-blur-md text-blue-900 p-6 shadow-lg">
        <Link href="/" className="flex items-center justify-center mb-8 transition-transform hover:scale-105">
          <Zap className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">Flash.AI</span>
        </Link>
        <nav className="space-y-4">
          <Link href="/" className="flex items-center py-2 px-4 hover:bg-blue-100 rounded transition duration-200">
            <BookOpen className="mr-3 h-5 w-5" />
            Home
          </Link>
          <Link href="/flashcards" className="flex items-center py-2 px-4 hover:bg-blue-100 rounded transition duration-200">
            <Brain className="mr-3 h-5 w-5" />
            Saved Flashcards
          </Link>
          <Link href="/pricing" className="flex items-center py-2 px-4 hover:bg-blue-100 rounded transition duration-200">
            <Star className="mr-3 h-5 w-5" />
            Pricing
          </Link>
          <button
            onClick={() => {/* Add sign out logic here */}}
            className="flex items-center w-full py-2 px-4 hover:bg-blue-100 rounded transition duration-200"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 animate-gradient">
            Generate Flashcards
          </h1>

          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 mb-12 transform hover:scale-105 transition-all duration-300">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-40 p-4 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-6 transition-all duration-300"
            ></textarea>
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Generate Flashcards
            </Button>
          </div>

          {flashcards.length > 0 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-semibold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                Flashcards Preview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {flashcards.map((flashcard, index) => (
                  <div key={index} className="flip-card h-64 cursor-pointer perspective" onClick={() => handleCardClick(index)}>
                    <div className={`flip-card-inner ${flipped[index] ? 'is-flipped' : ''} transition-transform duration-500 transform-style-3d`}>
                      <div className="flip-card-front bg-white shadow-lg rounded-2xl flex items-center justify-center p-6 absolute w-full h-full backface-hidden">
                        <p className="text-xl font-medium text-blue-800">{flashcard.front}</p>
                      </div>
                      <div className="flip-card-back bg-gradient-to-br from-blue-500 to-green-500 shadow-lg rounded-2xl flex items-center justify-center p-6 absolute w-full h-full backface-hidden transform rotate-y-180">
                        <p className="text-xl font-medium text-white">{flashcard.back}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button
                  onClick={handleOpen}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  Save Flashcards
                </Button>
              </div>
            </div>
          )}

          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">Save Flashcards</h2>
                <p className="mb-4 text-blue-800">Enter a name for your flashcards</p>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
                  placeholder="Collection Name"
                />
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={handleClose}
                    className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveFlashcards}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  .perspective {
    perspective: 1000px;
  }

  .transform-style-3d {
    transform-style: preserve-3d;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }

  .is-flipped {
    transform: rotateY(180deg);
  }
`}</style>
    </div>

    
  );
}

