interface Props {
    message: string
    status: number
    remainingRequests: number
}

function ResponseCard({message,status,remainingRequests}: Props){

    return (
        <div className="mt-6 text-center">
            <p className={`text-xl font-semibold ${status === 200 ? "text-green-600": "text-red-600"}`}>
                {message}
            </p>

            <p className="mt-2">
                Status: {status}
            </p>

            <p className="mt-2">
                Remaining Requests:
                {" "}
                {remainingRequests}
            </p>
        </div>
    )
}

export default ResponseCard