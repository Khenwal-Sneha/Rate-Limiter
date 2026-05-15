import axios from "axios"


export const fetchUserMetrics =
    async (userId: string) => {

        return axios.get(
            `/metrics`,
            {
                params: {
                    userId
                }
            }
        )
    }