import {
    type RequestHistory as HistoryType
} from "../types/RequestHistory"

interface Props {

    history: HistoryType[]
}

function RequestHistory({
    history
}: Props) {

    return (

        <div className="mt-8">

            <h2
                className="
                    text-xl
                    font-bold
                    mb-4
                "
            >
                Request History
            </h2>

            <div className="space-y-3">

                {
                    history.map((item) => (

                        <div
                            key={item.id}
                            className="
                                border
                                p-3
                                rounded-lg
                            "
                        >

                            <p>
                                User:
                                {" "}
                                {item.userId}
                            </p>

                            <p>
                                Status:
                                {" "}
                                {item.status}
                            </p>

                            <p>
                                Message:
                                {" "}
                                {item.message}
                            </p>

                            <p>
                                Time:
                                {" "}
                                {
                                    new Date(
                                        item.timestamp
                                    ).toLocaleTimeString()
                                }
                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default RequestHistory