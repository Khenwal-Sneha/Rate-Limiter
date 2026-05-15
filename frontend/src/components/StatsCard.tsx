interface Props {

    title: string

    value: string | number
}

function StatsCard({
    title,
    value
}: Props) {

    return (

        <div
            className="
                bg-white
                shadow-lg
                rounded-2xl
                p-6
                flex
                flex-col
                items-center
            "
        >

            <h2
                className="
                    text-gray-500
                    text-sm
                "
            >
                {title}
            </h2>

            <p
                className="
                    text-3xl
                    font-bold
                    mt-2
                "
            >
                {value}
            </p>

        </div>
    )
}

export default StatsCard