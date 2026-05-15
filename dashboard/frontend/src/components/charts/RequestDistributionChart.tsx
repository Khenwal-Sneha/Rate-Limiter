import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"

import { useRef, useState } from "react"
import { toPng } from "html-to-image"

import type { UserMetrics } from "../../types/UserMetrics"

interface Props {
    metrics: UserMetrics
}

function RequestDistributionChart({ metrics }: Props) {

    const chartRef = useRef<HTMLDivElement>(null)

    const [downloading, setDownloading] = useState(false)

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

    const COLORS = ["#22c55e", "#ef4444"]

    const downloadImage = async () => {

        if (!chartRef.current) return

        try {
            setDownloading(true)

            const dataUrl = await toPng(chartRef.current)

            const link = document.createElement("a")

            link.download = "request-distribution.png"

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
                bg-white
                mt-8
                p-6
                rounded-2xl
                shadow-lg
                h-[400px]
                flex
                flex-col
            "
        >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold text-slate-800">
                    Request Distribution
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

                    <PieChart>

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
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
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

        </div>
    )
}

export default RequestDistributionChart