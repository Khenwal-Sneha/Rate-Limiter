import type {
    AlgorithmType
} from "../types/AlgorithmType"

interface Props {

    selectedAlgorithm:
        AlgorithmType

    setSelectedAlgorithm:
        React.Dispatch<
            React.SetStateAction<
                AlgorithmType
            >
        >
}

function AlgorithmSelector({

    selectedAlgorithm,
    setSelectedAlgorithm

}: Props) {

    return (

        <select
            value={selectedAlgorithm}

            onChange={(e) => {

                const value =
                    e.target.value
            
                setSelectedAlgorithm(
                    value as AlgorithmType
                )
            }}

            className="
                w-full
                border
                p-3
                rounded-lg
                mb-4
            "
        >

            <option value="FIXED_WINDOW">
                Fixed Window
            </option>

            <option value="SLIDING_WINDOW">
                Sliding Window
            </option>

            <option value="TOKEN_BUCKET">
                Token Bucket
            </option>

        </select>
    )
}

export default AlgorithmSelector