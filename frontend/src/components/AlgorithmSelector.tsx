import type { AlgorithmType } from "../types/AlgorithmType"

interface Props {
    selectedAlgorithm: AlgorithmType
    setSelectedAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmType>>
}

function AlgorithmSelector({
    selectedAlgorithm,
    setSelectedAlgorithm
}: Props) {

    return (
        <div className="
            mb-4
            bg-white/70
            backdrop-blur-xl
            border border-white/40
            shadow-md
            rounded-2xl
            p-4
        ">

            <label className="text-xs text-slate-500 font-medium">
                Rate Limiting Algorithm
            </label>

            <select
                value={selectedAlgorithm}
                onChange={(e) => {
                    setSelectedAlgorithm(e.target.value as AlgorithmType)
                }}
                className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    bg-white/80
                    border border-slate-200
                    text-slate-700
                    outline-none
                    focus:ring-2
                    focus:ring-blue-400
                    transition
                "
            >

                <option value="FIXED_WINDOW">
                    Fixed Window Counter
                </option>

                <option value="SLIDING_WINDOW">
                    Sliding Window Log
                </option>

                <option value="TOKEN_BUCKET">
                    Token Bucket (Recommended)
                </option>

            </select>

        </div>
    )
}

export default AlgorithmSelector