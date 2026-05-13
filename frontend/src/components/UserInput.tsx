interface Props {

    userId: string

    setUserId: React.Dispatch<React.SetStateAction<string>>

    onSendRequest: () => void
}

function UserInput({userId,setUserId,onSendRequest}:Props) {

    return(
        <div>
            <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) =>
                    setUserId(e.target.value)
                }
                className="w-full border p-3 rounded-lg mb-4"
            />

            <button
                onClick={onSendRequest}
                className="w-full bg-black text-white p-3 rounded-lg"
            >
                Send Request
            </button>
        </div>
    )
}

export default UserInput