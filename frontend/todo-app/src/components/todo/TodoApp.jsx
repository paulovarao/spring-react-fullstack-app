import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './TodoApp.css'

import { useAuth } from './security/AuthContext'

import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'

import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'

import WelcomeComponent from './WelcomeComponent'
import TodosListComponent from './TodosListComponent'
import TodoComponent from './TodoComponent'
import ErrorComponent from './ErrorComponent'

import AuthProvider from './security/AuthContext'

function AuthenticatedRoute({ children }) {
    const authContext = useAuth()

    if (authContext.isAuthenticated)
        return children
    
    return <Navigate to="/" />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">

            <AuthProvider>

                <BrowserRouter>
                    <HeaderComponent />
                    
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />

                        <Route path='/welcome/:username' element={<AuthenticatedRoute><WelcomeComponent /></AuthenticatedRoute>} />
                        <Route path='/todos' element={<AuthenticatedRoute><TodosListComponent /></AuthenticatedRoute>} />
                        <Route path='/todo/:id' element={<AuthenticatedRoute><TodoComponent /></AuthenticatedRoute>} />
                        <Route path='/logout' element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />

                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>

                    <FooterComponent />
                </BrowserRouter>

            </AuthProvider>

            
        </div>
    )
}