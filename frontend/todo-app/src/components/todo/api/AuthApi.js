import { apiClient } from "./ApiClient"


export const authenticateWithBasicMethod = token => apiClient.get('/basicauth', {
    headers: {
        Authorization: token
    }
})

export const authenticateWithJwtMethod = (username, password) => apiClient.post('/authenticate', { username, password })