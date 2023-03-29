import { apiClient } from "./ApiClient"

export const authenticate = token => apiClient.get('/basicauth', {
    headers: {
        Authorization: token
    }
})