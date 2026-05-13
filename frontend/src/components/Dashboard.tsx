import { useState } from "react"

import UserInput
    from "./UserInput"

import ResponseCard
    from "./ResponseCard"

import RequestHistory
    from "./RequestHistory"

import LoadingSpinner
    from "./LoadingSpinner"

import {
    useRateLimiter
} from "../hooks/useRateLimiter"

function Dashboard() {

    const [userId, setUserId] =
        useState("")

    const {

        message,
        status,
        remainingRequests,
        loading,
        history,
        sendRequest

    } = useRateLimiter()

    const handleRequest = () => {

        sendRequest(userId)
    }

    return (

        <div
            className="
                min-h-screen
                bg-gray-100
                p-10
            "
        >

            <div
                className="
                    max-w-2xl
                    mx-auto
                    bg-white
                    p-10
                    rounded-2xl
                    shadow-xl
                "
            >

                <h1
                    className="
                        text-3xl
                        font-bold
                        mb-6
                        text-center
                    "
                >
                    Rate Limiter Dashboard
                </h1>

                <UserInput
                    userId={userId}
                    setUserId={setUserId}
                    onSendRequest={
                        handleRequest
                    }
                />

                {
                    loading &&
                    <LoadingSpinner />
                }

                <ResponseCard
                    message={message}
                    status={status}
                    remainingRequests={
                        remainingRequests
                    }
                />

                <RequestHistory
                    history={history}
                />

            </div>

        </div>
    )
}

export default Dashboard