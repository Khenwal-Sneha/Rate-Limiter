interface Props {
    userId: string
    setUserId: React.Dispatch<React.SetStateAction<string>>
    onSendRequest: () => void
}

function UserInput({
    userId,
    setUserId,
    onSendRequest
}: Props) {

    return (
        <div className="mt-6 space-y-4">

            {/* Input */}
            <input
                type="text"
                placeholder="Enter User ID (e.g. sneha)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-white/60
                    backdrop-blur-xl
                    border border-white/40
                    shadow-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-300
                    focus:shadow-lg
                    transition
                    text-gray-700
                "
            />

            {/* Button */}
            <button
                onClick={onSendRequest}
                className="
                    w-full
                    py-3
                    rounded-xl
                    font-semibold
                    text-white
                    bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500
                    shadow-md
                    hover:shadow-xl
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition
                "
            >
                Send Request
            </button>

        </div>
    )
}

export default UserInput