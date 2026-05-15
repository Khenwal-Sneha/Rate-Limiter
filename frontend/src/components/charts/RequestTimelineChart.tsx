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

import { useRef, useState } from "react"
import { toPng } from "html-to-image"

import type { RequestEvent } from "../../types/UserMetrics"

interface Props {
    requestEvents?: RequestEvent[]
}

function RequestTimelineChart({
    requestEvents = []
}: Props) {

    const chartRef = useRef<HTMLDivElement>(null)

    const [downloading, setDownloading] = useState(false)

    const groupedData: Record<
        string,
        { allowed: number; blocked: number }
    > = {}

    requestEvents.forEach((event) => {

        const time =
            new Date(event.timestamp).toLocaleTimeString()

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

    const data = Object.entries(groupedData).map(
        ([time, values]) => ({
            time,
            allowed: values.allowed,
            blocked: values.blocked
        })
    )

    const downloadImage = async () => {

        if (!chartRef.current) return

        try {
            setDownloading(true)

            const dataUrl = await toPng(chartRef.current)

            const link = document.createElement("a")

            link.download = "request-timeline.png"

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
                    Request Timeline
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

                    <LineChart data={data}>

                        {/* GRADIENTS */}
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

                        <CartesianGrid strokeDasharray="3 3" opacity={0.4} />

                        <XAxis dataKey="time" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="allowed"
                            stroke="url(#allowedLine)"
                            strokeWidth={3}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="blocked"
                            stroke="url(#blockedLine)"
                            strokeWidth={3}
                            dot={false}
                        />

                    </LineChart>

                </ResponsiveContainer>
            </div>

        </div>
    )
}

export default RequestTimelineChart