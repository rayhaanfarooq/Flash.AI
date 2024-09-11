"use client";


import { useUser } from "@clerk/nextjs";
import { writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { getDoc } from "firebase/firestore";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useState } from "react";

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
  );
}







// import { useUser } from "@clerk/nextjs";
// import { writeBatch } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import { getDoc } from "firebase/firestore";
// import { doc, collection, setDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import {
//   Container,
//   Box,
//   Typography,
//   Paper,
//   Button,
//   TextField,
//   Grid,
//   CardActionArea,
//   Card,
//   CardContent,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import { useState } from "react";

// export default function Generate() {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [flashcards, setFlashcards] = useState([]);
//   const [flipped, setFlipped] = useState({});
//   const [text, setText] = useState("");
//   const [name, setName] = useState("");
//   const [open, setOpen] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async () => {
//     fetch("/api/generate", {
//       method: "POST",
//       body: text,
//     })
//       .then((res) => res.json())
//       .then((data) => setFlashcards(data)).catch((err) => console.log("error" + err));
      
    
//   };

//   const handleCardClick = (id) => {
//     setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSaveFlashcards = async () => {
//     if (!name) {
//       alert("Please enter a name for your flashcards");
//       return;
//     }

//     const batch = writeBatch(db);
//     const userDocRef = doc(collection(db, "users"), user.id);
//     const docSnap = await getDoc(userDocRef);

//     if (docSnap.exists()) {
//       const collection = docSnap.data().flashcards || [];
//       if (collection.find((f) => f.name === name)) {
//         alert("You already have flashcards with that name");
//         return;
//       } else {
//         collection.push({ name });
//         batch.set(userDocRef, { flashcards: collection }, { merge: true });
//       }
//     } else {
//       batch.set(userDocRef, { flashcards: [{ name }] });
//     }

//     const colRef = collection(userDocRef, name);
//     flashcards.forEach((flashcard) => {
//       const cardDocRef = doc(colRef);
//       batch.set(cardDocRef, flashcard);
//     });

//     await batch.commit();
//     handleClose();
//     router.push("/flashcards");
//   };

//   return (
//     <Container maxWidth="100vh">
//       <Box
//         sx={{
//           mt: 4,
//           mb: 6,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h4">Generate Flashcards</Typography>

//         <Paper sx={{ p: 4, width: "100%" }}>
//           <TextField
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             label="Enter Text"
//             fullWidth
//             multiline
//             rows={4}
//             variant="outlined"
//             sx={{ mb: 2 }}
//           >
//             Enter Text
//           </TextField>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleSubmit}
//           >
//             {" "}
//             Submit{" "}
//           </Button>
//         </Paper>
//       </Box>

//       {flashcards.length > 0 && (
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <Typography> FlashCards Preview </Typography>
//           <Grid container spacing={3}>
//             {flashcards.map((flashcard, index) => (
//               <Grid item key={index} xs={12} sm={6} md={4}>
//                 <Card>
//                   <CardActionArea onClick={() => {handleCardClick(index)}}>
//                     <CardContent>
//                       <Box
//                         sx={{
//                           perspective: "1000px",
//                           "& > div": {
//                             transition: "transform 0.6s",
//                             transformStyle: "preserve-3d",
//                             position: "relative",
//                             width: "100%",
//                             height: "200px",
//                             boxShadow: "0 4px 8px 0 rbga(0,0,0.2)",
//                             transform: flipped[index]
//                               ? "rotateY(180deg)"
//                               : "rotateY(0deg)",
//                           },

//                           "& > div > div": {
//                             position: "absolute",
//                             width: "100%",
//                             height: "100%",
//                             backfaceVisibility: "hidden",
//                             display: "flex",

//                             justifyContent: "center",
//                             alignItems: "center",
//                             padding: 2,
//                             boxSizing: "border-box",
//                           },

//                           "& > div > div:nth-of-type(2)": {
//                             transform: "rotateY(180deg)",
//                           },
//                         }}
//                       >
//                         <div>
//                           <div>
//                             <Typography variant="h5" component="div">
//                               {" "}
//                               {flashcard.front}{" "}
//                             </Typography>
//                           </div>
//                           <div>
//                             <Typography variant="h5" component="div">
//                               {" "}
//                               {flashcard.back}{" "}
//                             </Typography>
//                           </div>
//                         </div>
//                       </Box>
//                     </CardContent>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//             <Button variant="contained" color="primary" onClick={handleOpen}>
//               Save Flashcards
//             </Button>
//           </Box>
//         </Box>
//       )}

//       <Dialog open={open} onClose={handleOpen}>
//         <DialogTitle> Save Flashcards </DialogTitle>
//         <DialogContent>
//             <DialogContentText>
//                 Enter a name for your flashcards
//             </DialogContentText>

//             <TextField autoFocus margin="dense" label="Collection Name" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} variant="outlined"/>

          
//         </DialogContent>

//         <DialogActions>
//             <Button onClick={handleOpen}> Cancel </Button>
//             <Button onClick={handleSaveFlashcards}> Save </Button>

//         </DialogActions>


//       </Dialog>

      
//     </Container>
//   );
// }
