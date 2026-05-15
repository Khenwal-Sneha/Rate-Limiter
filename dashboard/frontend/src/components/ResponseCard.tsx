interface Props {
    message: string
    status: number
    remainingRequests: number
}

function ResponseCard({
    message,
    status,
    remainingRequests
}: Props) {

    const isSuccess = status === 200

    const getStatusStyle = () => {
        if (status === 200) {
            return "bg-green-100 text-green-700 border-green-200"
        }
        if (status === 429) {
            return "bg-red-100 text-red-700 border-red-200"
        }
        return "bg-gray-100 text-gray-700 border-gray-200"
    }

    return (
        <div className="
            mt-6
            rounded-2xl
            border
            backdrop-blur-xl
            bg-white/60
            border-white/40
            shadow-lg
            p-5
            transition
        ">

            {/* Header */}
            <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-600">
                    API Response
                </h3>

                <span className={`
                    text-xs px-3 py-1 rounded-full border
                    ${getStatusStyle()}
                `}>
                    {status}
                </span>

            </div>

            {/* Message */}
            <div className={`
                text-lg font-medium
                ${isSuccess ? "text-green-700" : "text-red-600"}
            `}>
                {message}
            </div>

            {/* Footer stats */}
            <div className="mt-4 flex justify-between text-sm text-gray-500">

                <div>
                    Remaining Requests:
                    <span className="ml-1 font-semibold text-gray-700">
                        {remainingRequests}
                    </span>
                </div>

                <div className="text-xs text-gray-400">
                    Live Response
                </div>

            </div>

        </div>
    )
}

export default ResponseCard