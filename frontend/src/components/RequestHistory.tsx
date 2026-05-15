import { useState } from "react"
import { type RequestHistory as HistoryType } from "../types/RequestHistory"

import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

interface Props {
    history: HistoryType[]
}

function RequestHistory({ history }: Props) {

    const [showAll, setShowAll] = useState(false)
    const [downloading, setDownloading] = useState(false)

    const getStatusStyle = (status: number) => {
        if (status === 200) return "bg-green-100 text-green-700"
        if (status === 429) return "bg-red-100 text-red-700"
        return "bg-gray-100 text-gray-700"
    }

    const preview = history.slice(0, 6)

    const downloadExcel = async () => {

        try {
            setDownloading(true)

            const worksheetData = history.map(item => ({
                UserId: item.userId,
                Status: item.status,
                Message: item.message,
                Timestamp: new Date(item.timestamp).toLocaleString()
            }))

            const worksheet = XLSX.utils.json_to_sheet(worksheetData)

            const workbook = XLSX.utils.book_new()

            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Request History"
            )

            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array"
            })

            const blob = new Blob([excelBuffer], {
                type: "application/octet-stream"
            })

            saveAs(blob, "request-history.xlsx")

        } finally {
            setDownloading(false)
        }
    }

    return (
        <div className="mt-10">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">

                <h2 className="text-lg font-semibold text-gray-800">
                    Request Activity
                </h2>

                {/* DOWNLOAD BUTTON */}
                {history.length > 0 && (
                    <button
                        onClick={downloadExcel}
                        disabled={downloading}
                        className={`
                            px-3 py-1 rounded-md text-white transition
                            ${downloading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }
                        `}
                    >
                        {downloading ? "Exporting..." : "Download Excel"}
                    </button>
                )}

            </div>

            {/* Card */}
            <div className="
                divide-y divide-gray-200/60
                bg-white/60
                backdrop-blur-xl
                border border-white/40
                rounded-2xl
                shadow-lg
                overflow-hidden
            ">

                {/* Empty state */}
                {history.length === 0 ? (
                    <div className="p-6 text-sm text-gray-500">
                        No requests yet
                    </div>
                ) : (
                    <>
                        {/* Preview list */}
                        {preview.map((item) => (
                            <div
                                key={item.id}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    px-5 py-4
                                    hover:bg-white/70
                                    transition
                                "
                            >
                                <div className="flex flex-col gap-1">

                                    <div className="flex items-center gap-3">

                                        <span className="font-medium text-gray-800">
                                            {item.userId}
                                        </span>

                                        <span className={`
                                            text-xs px-2 py-0.5 rounded-full
                                            ${getStatusStyle(item.status)}
                                        `}>
                                            {item.status}
                                        </span>

                                    </div>

                                    <p className="text-sm text-gray-500 truncate max-w-md">
                                        {item.message}
                                    </p>

                                </div>

                                <div className="text-xs text-gray-400 whitespace-nowrap">
                                    {new Date(item.timestamp).toLocaleTimeString()}
                                </div>

                            </div>
                        ))}

                        {/* View all button */}
                        {history.length > 6 && (
                            <button
                                onClick={() => setShowAll(true)}
                                className="
                                    w-full
                                    text-sm
                                    font-medium
                                    text-indigo-600
                                    hover:text-indigo-800
                                    py-3
                                    transition
                                    bg-white/40
                                "
                            >
                                View full history →
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* MODAL */}
            {showAll && (
                <div className="
                    fixed inset-0 z-50
                    bg-black/30
                    backdrop-blur-sm
                    flex items-center justify-center
                    p-4
                ">

                    <div className="
                        w-full max-w-2xl
                        bg-white/70
                        backdrop-blur-xl
                        border border-white/40
                        rounded-2xl
                        shadow-2xl
                        overflow-hidden
                    ">

                        {/* Modal Header */}
                        <div className="
                            flex items-center justify-between
                            p-5
                            border-b border-gray-200/60
                        ">

                            <h2 className="text-lg font-semibold text-gray-800">
                                Full Request History
                            </h2>

                            <button
                                onClick={() => setShowAll(false)}
                                className="text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>

                        </div>

                        {/* Modal Body */}
                        <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-200/60">

                            {history.map((item) => (
                                <div
                                    key={item.id}
                                    className="
                                        px-5 py-4
                                        flex justify-between
                                        hover:bg-white/60
                                        transition
                                    "
                                >

                                    <div>

                                        <div className="flex gap-3 items-center">

                                            <span className="font-medium text-gray-800">
                                                {item.userId}
                                            </span>

                                            <span className={`
                                                text-xs px-2 py-0.5 rounded-full
                                                ${getStatusStyle(item.status)}
                                            `}>
                                                {item.status}
                                            </span>

                                        </div>

                                        <p className="text-sm text-gray-500">
                                            {item.message}
                                        </p>

                                    </div>

                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {new Date(item.timestamp).toLocaleTimeString()}
                                    </span>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}

export default RequestHistory