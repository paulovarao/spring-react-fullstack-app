import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function LoginComponent() {

    const [username, setUsername] = useState('in28minutes')
    const [password, setPassword] = useState('')
    const [authenticationMessage, setAuthenticationMessage] = useState('')
    const navigate = useNavigate()

    const authContext = useAuth()

    function handleSubmit() {
        if (authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        } else {
            setAuthenticationMessage('Authentication failed: please check your credentials.')
        }
    }

    return (
        <div className="Login">
            <h1>Time to login</h1>

            <div id="authenticationMessage">{authenticationMessage}</div>
            
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={evt => setUsername(evt.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={evt => setPassword(evt.target.value)} />
                </div>
                <div>
                    <button name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent