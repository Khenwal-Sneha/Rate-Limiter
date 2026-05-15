import axios from "axios"
import { API_BASE_URL } from "../config/apiConfig"


export const fetchUserMetrics =
    async (userId: string) => {

        return axios.get(
            `${API_BASE_URL}/metrics`,
            {
                params: {
                    userId
                }
            }
        )
    }