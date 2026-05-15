import axios from "axios"

import type {
    AlgorithmType
} from "../types/AlgorithmType"

export const sendRateLimitedRequest =
    async (
        userId: string,
        algorithm: AlgorithmType
    ) => {

        return axios.get(
            `/api`,
            {
                params: {
                    userId,
                    algorithm
                }
            }
        )
    }