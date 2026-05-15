import axios from "axios"

import {
    API_BASE_URL
} from "../config/apiConfig"

import type {
    AlgorithmType
} from "../types/AlgorithmType"

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
                }
            }
        )
    }