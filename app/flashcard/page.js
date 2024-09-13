"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParms = useSearchParams();
  const search = searchParms.get("id");

  useEffect(() => {
    const fetchFlashcard = async () => {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });

      setFlashcards(flashcards);
    };

    fetchFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {flashcards.length > 0 && (
        <div className="animate-fade-in">
          <h2 className="text-3xl font-semibold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Flashcards Preview
          </h2>

          <div className="mt-12 text-center">
            <Link href="/flashcards">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                Saved Flashcards
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flashcards.map((flashcard, index) => (
              <div
                key={index}
                className="flip-card h-64 cursor-pointer perspective"
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`flip-card-inner ${
                    flipped[index] ? "is-flipped" : ""
                  } transition-transform duration-500 transform-style-3d`}
                >
                  <div className="flip-card-front bg-white shadow-lg rounded-2xl flex items-center justify-center p-6 absolute w-full h-full backface-hidden">
                    <p className="text-xl font-medium text-blue-800">
                      {flashcard.front}
                    </p>
                  </div>
                  <div className="flip-card-back bg-gradient-to-br from-blue-500 to-green-500 shadow-lg rounded-2xl flex items-center justify-center p-6 absolute w-full h-full backface-hidden transform rotate-y-180">
                    <p className="text-xl font-medium text-white">
                      {flashcard.back}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
