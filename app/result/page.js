'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSession = async () => {
            if (!session_id) return

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()

                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchSession()
    }, [session_id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <h2 className="ml-4 text-2xl">Loading...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-2xl text-red-500">{error}</h2>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {session.payment_status === 'paid' ? (
                <>
                    <h2 className="text-3xl font-bold">Payment Successful</h2>
                    <div className="mt-8">
                        <p className="text-lg">Session ID: {session_id}</p>
                        <p className="text-lg">You will receive an email shortly</p>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-red-500">Payment Failed</h2>
                    <div className="mt-8">
                        <p className="text-lg">Your payment was not successful. Please try again.</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default ResultPage
