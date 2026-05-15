export interface StrategyMetrics {
    allowedRequests: number
    blockedRequests: number
}

export interface RequestEvent {
    timestamp: number
    allowed: boolean
}

export interface UserMetrics {

    totalAllowedRequests: number

    totalBlockedRequests: number

    requestEvents: RequestEvent[]

    strategyMetrics: Record<
        string,
        StrategyMetrics
    >
}