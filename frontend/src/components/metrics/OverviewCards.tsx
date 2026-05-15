import type {
    UserMetrics
} from "../../types/UserMetrics"

interface Props {

    metrics: UserMetrics
}

function OverviewCards({
    metrics
}: Props) {

    const successRate =

        (
            metrics.totalAllowedRequests
            /
            (
                metrics.totalAllowedRequests
                +
                metrics.totalBlockedRequests
            )
            *
            100
        ).toFixed(1)

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
                mt-8
            "
        >

            <div
                className="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow-lg
                "
            >

                <h2
                    className="
                        text-gray-500
                    "
                >
                    Allowed Requests
                </h2>

                <p
                    className="
                        text-3xl
                        font-bold
                        mt-2
                        text-green-600
                    "
                >
                    {
                        metrics
                            .totalAllowedRequests
                    }
                </p>

            </div>

            <div
                className="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow-lg
                "
            >

                <h2
                    className="
                        text-gray-500
                    "
                >
                    Blocked Requests
                </h2>

                <p
                    className="
                        text-3xl
                        font-bold
                        mt-2
                        text-red-600
                    "
                >
                    {
                        metrics
                            .totalBlockedRequests
                    }
                </p>

            </div>

            <div
                className="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow-lg
                "
            >

                <h2
                    className="
                        text-gray-500
                    "
                >
                    Success Rate
                </h2>

                <p
                    className="
                        text-3xl
                        font-bold
                        mt-2
                    "
                >
                    {successRate}%
                </p>

            </div>

        </div>
    )
}

export default OverviewCards