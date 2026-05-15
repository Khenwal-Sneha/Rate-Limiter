import { useState } from "react"

import toast from "react-hot-toast"

import axios from "axios"

import {
    sendRateLimitedRequest
} from "../services/rateLimiterApi"

import {
    type RequestHistory
} from "../types/RequestHistory"

import {
    type AlgorithmType
} from "../types/AlgorithmType"

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

    const addHistoryItem = (
        userId: string,
        status: number,
        message: string
    ) => {

        const historyItem: RequestHistory = {

            id: Date.now(),

            userId,

            status,

            message,

            timestamp: Date.now()
        }

        setHistory((prev) => [
            historyItem,
            ...prev
        ])
    }

    const sendRequest = async (
        userId: string,
        algorithm: AlgorithmType
    ) => {

        if (!userId.trim()) {

            toast.error(
                "User ID is required"
            )

            return
        }

        setLoading(true)

        try {

            const response =
                await sendRateLimitedRequest(
                    userId,
                    algorithm
                )

            const successMessage =
                response.data.message

            const responseStatus =
                response.status

            const remaining =
                Number(
                    response.headers[
                        "x-rate-limit-remaining"
                    ] || 0
                )

            setMessage(successMessage)

            setStatus(responseStatus)

            setRemainingRequests(
                remaining
            )

            addHistoryItem(
                userId,
                responseStatus,
                successMessage
            )

            toast.success(
                "Request Allowed"
            )

        } catch (error) {

            if (
                axios.isAxiosError(error)
                &&
                error.response
            ) {

                const errorMessage =

                    error.response.data
                        ?.message
                    ||
                    "Request Failed"

                const errorStatus =
                    error.response.status

                const remaining =
                    Number(
                        error.response.headers[
                            "x-rate-limit-remaining"
                        ] || 0
                    )

                setMessage(errorMessage)

                setStatus(errorStatus)

                setRemainingRequests(
                    remaining
                )

                addHistoryItem(
                    userId,
                    errorStatus,
                    errorMessage
                )

                toast.error(
                    errorMessage
                )

            } else {

                setMessage(
                    "Server Error"
                )

                setStatus(500)

                setRemainingRequests(0)

                addHistoryItem(
                    userId,
                    500,
                    "Server Error"
                )

                toast.error(
                    "Server Error"
                )
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