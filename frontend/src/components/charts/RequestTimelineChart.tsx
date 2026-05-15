import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts"

import type { RequestEvent } from "../../types/UserMetrics"

interface Props {
    requestEvents?: RequestEvent[]
}

function RequestTimelineChart({
    requestEvents = []
}: Props) {

    const groupedData: Record<
        string,
        { allowed: number; blocked: number }
    > = {}

    requestEvents.forEach((event) => {

        const time = new Date(event.timestamp).toLocaleTimeString()

        if (!groupedData[time]) {
            groupedData[time] = {
                allowed: 0,
                blocked: 0
            }
        }

        if (event.allowed) {
            groupedData[time].allowed++
        } else {
            groupedData[time].blocked++
        }
    })

    const data = Object.entries(groupedData).map(([time, values]) => ({
        time,
        allowed: values.allowed,
        blocked: values.blocked
    }))

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
                Request Timeline
            </h2>

            <ResponsiveContainer width="100%" height="100%">

                <LineChart data={data}>

                    {/* GRADIENT DEFINITIONS */}
                    <defs>
                        <linearGradient id="allowedLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>

                        <linearGradient id="blockedLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#fb7185" />
                            <stop offset="100%" stopColor="#e11d48" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        opacity={0.6}
                    />

                    <XAxis
                        dataKey="time"
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

                    <Line
                        type="monotone"
                        dataKey="allowed"
                        stroke="url(#allowedLine)"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="blocked"
                        stroke="url(#blockedLine)"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    )
}

export default RequestTimelineChart