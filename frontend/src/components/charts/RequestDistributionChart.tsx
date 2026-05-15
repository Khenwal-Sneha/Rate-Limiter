import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"

import type { UserMetrics } from "../../types/UserMetrics"

interface Props {
    metrics: UserMetrics
}

function RequestDistributionChart({ metrics }: Props) {

    const data = [
        {
            name: "Allowed",
            value: metrics.totalAllowedRequests
        },
        {
            name: "Blocked",
            value: metrics.totalBlockedRequests
        }
    ]

    const COLORS = [
        "url(#allowedGradient)",
        "url(#blockedGradient)"
    ]

    return (
        <div className="
            bg-white
            mt-8
            p-6
            rounded-2xl
            shadow-lg
            h-[400px]
        ">

            <h2 className="
                text-xl
                font-bold
                mb-4
                text-slate-800
            ">
                Request Distribution
            </h2>

            <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                    {/* Gradients */}
                    <defs>
                        <linearGradient id="allowedGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#4ade80" />
                            <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>

                        <linearGradient id="blockedGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#fb7185" />
                            <stop offset="100%" stopColor="#e11d48" />
                        </linearGradient>
                    </defs>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={5}
                        stroke="white"
                        strokeWidth={3}
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb"
                        }}
                    />

                </PieChart>

            </ResponsiveContainer>

        </div>
    )
}

export default RequestDistributionChart