'use client'


import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import getStripe from '@/utils/get-stripe'
import { useSearchParams } from 'next/navigation'
import { CircularProgress, Container, Typography, Box} from '@mui/material'


const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading ] = useState(true)
    const [ session, setSession ] = useState(null)  
    const [ error, setError ] = useState(null)


    useEffect(() => {
        const fetchSession = async() => {
            if(!session_id) return

            else{
                try {
                    const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                    const sessionData = await res.json()
                    if(res.ok){
                        setSession(sessionData)
                       
                    }

                    else{
                        setError(sessionData.error)
                    }
                    

                }

                catch(error) {
                    setError(error)
                }

                finally{
                    setLoading(false)
                }
            }


            
           
        }

        fetchSession()
    }, [session_id])


    if(loading) {
        return(
            <Container

            maxWidth="100vw"
            sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
            
            >

                <CircularProgress />
                <Typography variant="h4" sx={{ ml: 2 }}> Loading...</Typography>
                
            </Container>
        )
    }

    if(error) {
        return(

            <Container

            maxWidth="100vw"
            sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
            
            >

        
                <Typography variant="h4" sx={{ ml: 2 }}> { error } </Typography>
                
            </Container>
        )
    }

    return (

        <Container

        maxWidth="100vw"
        sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}
        
        >

            {

            session.payment_status === 'paid' ? (

                <>
            
                <Typography variant="h4" sx={{ ml: 2 }}> Payment Successful </Typography>
                <Box sx={{mt:22}}>
                    <Typography variant="h6"> Session ID: {session_id} </Typography>
                    <Typography variant="body1"> You will recieve an email shortly </Typography>

                </Box>

                </>


            ) :
            (


            <>
            
            <Typography variant="h4" sx={{ ml: 2 }}> Payment Failed</Typography>
            <Box sx={{mt:22}}>
                <Typography variant="body1"> Your payment was not successful. Please try again. </Typography>
            </Box>

            </>

            )

        }
    
            
        </Container>


    )

  







}

export default ResultPage