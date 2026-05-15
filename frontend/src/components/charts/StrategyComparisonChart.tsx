import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"

import { useRef, useState } from "react"
import { toPng } from "html-to-image"

import type { UserMetrics } from "../../types/UserMetrics"

interface Props {
    metrics: UserMetrics
}

function StrategyComparisonChart({ metrics }: Props) {

    const chartRef = useRef<HTMLDivElement>(null)

    const [downloading, setDownloading] = useState(false)

    const data = Object.entries(metrics.strategyMetrics).map(
        ([strategy, values]) => ({
            strategy,
            allowed: values.allowedRequests,
            blocked: values.blockedRequests
        })
    )

    const downloadImage = async () => {

        if (!chartRef.current) return

        try {
            setDownloading(true)

            const dataUrl = await toPng(chartRef.current)

            const link = document.createElement("a")

            link.download = "strategy-comparison.png"

            link.href = dataUrl

            link.click()

        } finally {
            setDownloading(false)
        }
    }

    return (
        <div
            ref={chartRef}
            className="
                bg-white/70
                backdrop-blur-xl
                border
                border-white/40
                shadow-lg
                rounded-2xl
                p-6
                h-[420px]
                flex
                flex-col
            "
        >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">

                <h2 className="text-lg font-semibold text-slate-800">
                    Strategy Comparison
                </h2>

                <button
                    onClick={downloadImage}
                    disabled={downloading}
                    className={`
                        px-3 py-1 rounded-md text-white transition
                        ${downloading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }
                    `}
                >
                    {downloading ? "Downloading..." : "Download"}
                </button>

            </div>

            {/* CHART */}
            <div className="flex-1">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        barGap={8}
                        barCategoryGap="30%"
                    >

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

        </div>
    )
}

export default StrategyComparisonChart