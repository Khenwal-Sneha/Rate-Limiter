import { useState } from "react"

import {
    sendRateLimitedRequest
} from "../services/rateLimiterApi"

import {
    type RequestHistory
} from "../types/RequestHistory"

export function useRateLimiter() {

    const [message, setMessage] =
        useState("")

    const [status, setStatus] =
        useState(0)

    const [
        remainingRequests,
        setRemainingRequests
    ] = useState(0)

    const [loading, setLoading] =
        useState(false)

    const [history, setHistory] =
        useState<RequestHistory[]>([])

    const sendRequest = async (
        userId: string
    ) => {

        setLoading(true)

        try {

            const response =
                await sendRateLimitedRequest(
                    userId
                )

            setMessage(
                response.data.message
            )

            setStatus(
                response.status
            )

            setRemainingRequests(
                Number(
                    response.headers[
                        "x-rate-limit-remaining"
                    ] || 0
                )
            )

            const newHistoryItem = {

                id: Date.now(),

                userId,

                status: response.status,

                message:
                    response.data.message,

                timestamp: Date.now()
            }

            setHistory((prev) => [
                newHistoryItem,
                ...prev
            ])

        } catch (error: any) {

            if (error.response) {

                setMessage(
                    error.response.data.message
                )

                setStatus(
                    error.response.status
                )

                setRemainingRequests(
                    Number(
                        error.response.headers[
                            "x-rate-limit-remaining"
                        ] || 0
                    )
                )

                const newHistoryItem = {

                    id: Date.now(),

                    userId,

                    status:
                        error.response.status,

                    message:
                        error.response.data
                            .message,

                    timestamp: Date.now()
                }

                setHistory((prev) => [
                    newHistoryItem,
                    ...prev
                ])

            } else {

                setMessage("Server Error")

                setStatus(500)

                setRemainingRequests(0)

                const newHistoryItem = {

                    id: Date.now(),

                    userId,

                    status: 500,

                    message: "Server Error",

                    timestamp: Date.now()
                }

                setHistory((prev) => [
                    newHistoryItem,
                    ...prev
                ])
            }

        } finally {

            setLoading(false)
        }
    }

    return {

        message,
        status,
        remainingRequests,
        loading,
        history,
        sendRequest
    }
}