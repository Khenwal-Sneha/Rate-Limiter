import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from "recharts"

import type { UserMetrics } from "../../types/UserMetrics"

interface Props {
    metrics: UserMetrics
}

function StrategyComparisonChart({ metrics }: Props) {

    const data = Object.entries(metrics.strategyMetrics).map(
        ([strategy, values]) => ({
            strategy,
            allowed: values.allowedRequests,
            blocked: values.blockedRequests
        })
    )

    return (
        <div className="
            bg-white/70
            backdrop-blur-xl
            border
            border-white/40
            shadow-lg
            rounded-2xl
            p-6
            h-[420px]
        ">

            <h2 className="
                text-lg font-semibold text-slate-800 mb-4
            ">
                Strategy Comparison
            </h2>

            <ResponsiveContainer width="100%" height="100%">

                <BarChart data={data} barGap={8} barCategoryGap="30%">

                    <defs>
                        <linearGradient id="allowedBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4ade80" />
                            <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>

                        <linearGradient id="blockedBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fb7185" />
                            <stop offset="100%" stopColor="#e11d48" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        opacity={0.5}
                    />

                    <XAxis
                        dataKey="strategy"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                    />

                    <YAxis
                        tick={{ fontSize: 12, fill: "#64748b" }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(255,255,255,0.9)",
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb",
                            backdropFilter: "blur(10px)"
                        }}
                    />

                    <Legend />

                    <Bar
                        dataKey="allowed"
                        fill="url(#allowedBar)"
                        radius={[6, 6, 0, 0]}
                    />

                    <Bar
                        dataKey="blocked"
                        fill="url(#blockedBar)"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    )
}

export default StrategyComparisonChart