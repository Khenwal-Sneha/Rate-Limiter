interface Props {
    title: string
    value: React.ReactNode
}

function StatsCard({ title, value }: Props) {
    return (
        <div className="
            relative
            bg-white/60
            backdrop-blur-xl
            border border-white/40
            shadow-md
            rounded-2xl
            p-6
            flex flex-col
            gap-2
            transition
            hover:shadow-xl
            hover:-translate-y-1
            overflow-hidden
        ">

            {/* top gradient accent */}
            <div className="
                absolute top-0 left-0 right-0 h-1
                bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400
                rounded-t-2xl
            " />

            {/* Title */}
            <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                {title}
            </h2>

            {/* Value (safe for text, numbers, JSX badges) */}
            <div className="text-l font-semibold text-gray-800 truncate">
                {value}
            </div>

            {/* soft glow */}
            <div className="
                absolute -bottom-10 -right-10
                w-24 h-24
                bg-blue-200/30
                blur-2xl
                rounded-full
            " />

        </div>
    )
}

export default StatsCard