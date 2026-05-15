import {
    useEffect,
    useState
} from "react"

import {
    fetchUserMetrics
} from "../services/userMetricsApi"

import type {
    UserMetrics
} from "../types/UserMetrics"

export function useUserMetrics(
    userId: string
) {

    const [metrics, setMetrics] =
        useState<UserMetrics | null>(
            null
        )

    useEffect(() => {

        if (!userId) return

        const interval = setInterval(
            async () => {

                try {

                    const response =
                        await fetchUserMetrics(
                            userId
                        )

                    setMetrics(
                        response.data
                    )

                } catch (error) {

                    console.error(error)
                }

            },
            1000
        )

        return () =>
            clearInterval(interval)

    }, [userId])

    return metrics
}