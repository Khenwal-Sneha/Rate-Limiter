import type { UserMetrics } from "../../types/UserMetrics"

interface Props {
    metrics: UserMetrics
}

function OverviewCards({ metrics }: Props) {

    const total =
        metrics.totalAllowedRequests +
        metrics.totalBlockedRequests

    const successRate =
        total === 0
            ? "0.0"
            : ((metrics.totalAllowedRequests / total) * 100).toFixed(1)

    return (
        <div className="
            grid grid-cols-1 md:grid-cols-3 gap-4 mt-8
        ">

            {/* ALLOWED */}
            <div className="
                group
                bg-white/70
                backdrop-blur-xl
                border border-white/40
                shadow-lg
                rounded-2xl
                p-6
                transition
                hover:shadow-xl
                hover:scale-[1.02]
            ">

                <div className="flex items-center justify-between">
                    <h2 className="text-slate-500 text-sm font-medium">
                        Allowed Requests
                    </h2>

                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                <p className="text-3xl font-bold mt-3 text-green-600">
                    {metrics.totalAllowedRequests}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                    Successfully processed
                </p>
            </div>

            {/* BLOCKED */}
            <div className="
                group
                bg-white/70
                backdrop-blur-xl
                border border-white/40
                shadow-lg
                rounded-2xl
                p-6
                transition
                hover:shadow-xl
                hover:scale-[1.02]
            ">

                <div className="flex items-center justify-between">
                    <h2 className="text-slate-500 text-sm font-medium">
                        Blocked Requests
                    </h2>

                    <div className="w-3 h-3 rounded-full bg-red-500" />
                </div>

                <p className="text-3xl font-bold mt-3 text-red-600">
                    {metrics.totalBlockedRequests}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                    Rate limit triggered
                </p>
            </div>

            {/* SUCCESS RATE */}
            <div className="
                group
                bg-white/70
                backdrop-blur-xl
                border border-white/40
                shadow-lg
                rounded-2xl
                p-6
                transition
                hover:shadow-xl
                hover:scale-[1.02]
            ">

                <div className="flex items-center justify-between">
                    <h2 className="text-slate-500 text-sm font-medium">
                        Success Rate
                    </h2>

                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                </div>

                <p className="text-3xl font-bold mt-3 text-slate-800">
                    {successRate}%
                </p>

                <p className="text-xs text-slate-400 mt-1">
                    Allowed / Total requests
                </p>
            </div>

        </div>
    )
}

export default OverviewCards