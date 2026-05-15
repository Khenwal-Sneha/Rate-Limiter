import axios from "axios"

import type {
    AlgorithmType
} from "../types/AlgorithmType"

const API_BASE_URL =
    import.meta.env
        .VITE_API_BASE_URL

export const sendRateLimitedRequest =
    async (
        userId: string,
        algorithm: AlgorithmType
    ) => {

        return axios.get(

            `${API_BASE_URL}/api`,

            {
                params: {
                    userId,
                    algorithm
                },

                timeout: 60000
            }
        )
    }