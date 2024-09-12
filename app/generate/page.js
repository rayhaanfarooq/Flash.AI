"use client";


import { useUser } from "@clerk/nextjs";
import { writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { getDoc } from "firebase/firestore";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useState } from "react";
import Link from "next/link";

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


    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-64 bg-indigo-800 text-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <nav>
        <Link href="/" className="block py-2 px-4 hover:bg-indigo-700 rounded transition duration-200">
          Home
        </Link>
        <Link href="/flashcards" className="block py-2 px-4 hover:bg-indigo-700 rounded transition duration-200">
          Saved Flashcards
        </Link>
        <Link href="/pricing" className="block py-2 px-4 hover:bg-indigo-700 rounded transition duration-200">
          Pricing
        </Link>
        <button
          onClick={() => {/* Add sign out logic here */}}
          className="block w-full text-left py-2 px-4 hover:bg-indigo-700 rounded transition duration-200"
        >
          Sign Out
        </button>
      </nav>
    </div>

    {/* Main content */}
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Generate Flashcards</h1>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mb-4"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Generate Flashcards
            </button>
          </div>

          {flashcards.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-600">Flashcards Preview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flashcards.map((flashcard, index) => (
                  <div key={index} className="flip-card h-64 cursor-pointer" onClick={() => handleCardClick(index)}>
                    <div className={`flip-card-inner ${flipped[index] ? 'is-flipped' : ''}`}>
                      <div className="flip-card-front bg-white shadow-md rounded-lg flex items-center justify-center p-4">
                        <p className="text-lg font-medium text-gray-800">{flashcard.front}</p>
                      </div>
                      <div className="flip-card-back bg-indigo-100 shadow-md rounded-lg flex items-center justify-center p-4">
                        <p className="text-lg font-medium text-indigo-800">{flashcard.back}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button
                  onClick={handleOpen}
                  className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Save Flashcards
                </button>
              </div>
            </div>
          )}

          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Save Flashcards</h2>
                <p className="mb-4 text-gray-600">Enter a name for your flashcards</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
                  placeholder="Collection Name"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveFlashcards}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
   
  );
}

