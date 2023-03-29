import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false)

    function login(username, password) {
        const authenticated = username === 'in28minutes' && password === 'dummy'
        
        setAuthenticated(authenticated)

        return authenticated
    }

    function logout() {
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}