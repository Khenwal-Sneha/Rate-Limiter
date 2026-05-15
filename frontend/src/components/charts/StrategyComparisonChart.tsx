import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer

} from "recharts"

import type {
    UserMetrics
} from "../../types/UserMetrics"

interface Props {

    metrics: UserMetrics
}

function StrategyComparisonChart({
    metrics
}: Props) {

    const data =

        Object.entries(
            metrics.strategyMetrics
        ).map(

            ([strategy, values]) => ({

                strategy,

                allowed:
                    values.allowedRequests,

                blocked:
                    values.blockedRequests
            })
        )

    return (

        <div
            className="
                bg-white
                mt-8
                p-6
                rounded-2xl
                shadow-lg
                h-[400px]
            "
        >

            <h2
                className="
                    text-xl
                    font-bold
                    mb-4
                "
            >
                Strategy Comparison
            </h2>

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart data={data}>

                    <XAxis dataKey="strategy" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar dataKey="allowed" />

                    <Bar dataKey="blocked" />

                </BarChart>

            </ResponsiveContainer>

        </div>
    )
}

export default StrategyComparisonChart