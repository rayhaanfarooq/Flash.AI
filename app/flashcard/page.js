'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDoc, setDoc, doc, CollectionReference, collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { useSearchParams } from 'next/navigation'
import {
    Container,
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Grid,
    CardActionArea,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@mui/material";


export default function Flashcard(){
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParms = useSearchParams();
  const search = searchParms.get('id')

  useEffect(() => {
    const fetchFlashcard = async () => {
        if( !search || !user) return

        const colRef = collection(doc(collection(db, 'users'), user.id), search)
        const docs = await getDocs(colRef)
        const flashcards = []


        docs.forEach(doc => {
            flashcards.push({id: doc.id, ...doc.data()})
        })

        setFlashcards(flashcards)

    }

    fetchFlashcard()
}, [user, search])

const handleCardClick = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
};

return (

    <Container maxWidth="100vw">
        <Grid container spacing = {3} sx={{mt:4}} >
            <Typography variant="h4" gutterBottom>
                Flashcards
            </Typography>

            {/* Implement the following code in react, figure it out and then replace the same code in generate with this code */}
            {flashcards.map((flashcard, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardActionArea onClick={() => {handleCardClick(index)}}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          "& > div": {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "200px",
                            boxShadow: "0 4px 8px 0 rbga(0,0,0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          },

                          "& > div > div": {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",

                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          },

                          "& > div > div:nth-of-type(2)": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h5" component="div">
                              {" "}
                              {flashcard.front}{" "}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {" "}
                              {flashcard.back}{" "}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
    </Container>
    
)
}