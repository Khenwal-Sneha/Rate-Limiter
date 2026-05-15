import { useState } from "react"

import UserInput from "./UserInput"
import ResponseCard from "./ResponseCard"
import RequestHistory from "./RequestHistory"
import LoadingSpinner from "./LoadingSpinner"
import StatsCard from "./StatsCard"
import AlgorithmSelector from "./AlgorithmSelector"

import OverviewCards from "./metrics/OverviewCards"
import StrategyComparisonChart from "./charts/StrategyComparisonChart"
import RequestDistributionChart from "./charts/RequestDistributionChart"
import RequestTimelineChart from "./charts/RequestTimelineChart"

import { useRateLimiter } from "../hooks/useRateLimiter"
import { useUserMetrics } from "../hooks/useUserMetrics"

import type { AlgorithmType } from "../types/AlgorithmType"

function Dashboard() {

    const [selectedAlgorithm, setSelectedAlgorithm] =
        useState<AlgorithmType>("TOKEN_BUCKET")

    const [userId, setUserId] = useState("")

    const {
        message,
        status,
        remainingRequests,
        loading,
        history,
        sendRequest
    } = useRateLimiter()

    const emptyMetrics = {
        totalAllowedRequests: 0,
        totalBlockedRequests: 0,
        strategyMetrics: {
            FIXED_WINDOW: { allowedRequests: 0, blockedRequests: 0 },
            SLIDING_WINDOW: { allowedRequests: 0, blockedRequests: 0 },
            TOKEN_BUCKET: { allowedRequests: 0, blockedRequests: 0 }
        },
        requestEvents: []
    }

    const apiMetrics = useUserMetrics(userId)

    const metrics = apiMetrics ?? emptyMetrics

    const handleRequest = () => {
        sendRequest(userId, selectedAlgorithm)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-10">

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Rate Limiter Dashboard
                    </h1>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT CONTROL PANEL */}
                    <div className="lg:col-span-4 space-y-5">

                        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-5">

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <StatsCard
                                    title="Remaining"
                                    value={remainingRequests}
                                />

                                <StatsCard
                                    title="Algorithm"
                                    value={selectedAlgorithm}
                                />
                            </div>

                            <AlgorithmSelector
                                selectedAlgorithm={selectedAlgorithm}
                                setSelectedAlgorithm={setSelectedAlgorithm}
                            />

                            <UserInput
                                userId={userId}
                                setUserId={setUserId}
                                onSendRequest={handleRequest}
                            />

                            {loading && (
                                <div className="flex justify-center py-4">
                                    <LoadingSpinner />
                                </div>
                            )}

                            <ResponseCard
                                message={message}
                                status={status}
                                remainingRequests={remainingRequests}
                            />

                        </div>

                        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-5">
                            <RequestHistory history={history} />
                        </div>

                    </div>

                    {/* RIGHT ANALYTICS PANEL */}
                    <div className="lg:col-span-8 space-y-6">

                    <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-5">
    <OverviewCards metrics={metrics} />
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-5">
        <StrategyComparisonChart metrics={metrics} />
    </div>

    <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-5">
        <RequestDistributionChart metrics={metrics} />
    </div>
</div>

<div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-5">
    <RequestTimelineChart requestEvents={metrics.requestEvents} />
</div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Dashboard