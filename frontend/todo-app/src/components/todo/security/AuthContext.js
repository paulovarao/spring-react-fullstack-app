import { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from '../api/ApiClient'
import { authenticate } from '../api/BasicAuthApi'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        if(token) {
            apiClient.defaults.headers.common['Authorization'] = token;
        }
    }, [token]);

    async function login(username, password) {

        const baToken = `Basic ${window.btoa(`${username}:${password}`)}`

        try {
            const response = await authenticate(baToken)

            const authenticated = response.status === 200
            setAuthenticated(authenticated)
            if (authenticated) {
                setUsername(username)
                setToken(baToken)
            }

            return authenticated
        } catch (error) {
            logout()
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    )
}