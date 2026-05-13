import axios from "axios"

import {
    API_BASE_URL
} from "../config/apiConfig"

export const sendRateLimitedRequest =
    async (userId: string) => {

        return axios.get(
            `${API_BASE_URL}/api?userId=${userId}`
        )
    }