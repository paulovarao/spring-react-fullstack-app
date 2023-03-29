import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteTodoById, retrieveAllTodosForUsername } from "./api/TodoApi"
import { useAuth } from './security/AuthContext'

function TodosListComponent() {

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    
    const authContext = useAuth()
    const username = authContext.username
    
    useEffect(refreshTodos, [username])

    const navigate = useNavigate()

    function refreshTodos() {
        retrieveAllTodosForUsername(username)
            .then(response => setTodos(response.data))
            .catch(console.log)
    }

    function deleteTodo(id) {
        deleteTodoById(username, id)
            .then(
                () => {
                    setMessage(`Todo ${id} was successfully deleted`)
                    refreshTodos()
                }
            )
            .catch(console.log)
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate('/todo/-1')
    }

    const todoStruct = {description: 'Description', done: 'Done?', targetDate: 'Target Date'}
    const todoKeys = Object.keys(todoStruct)

    return (
        <div className="container">
            <h1>Things you want to do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table" >
                    <thead>
                        <tr>
                            {todoKeys.map(k => <th key={k}>{todoStruct[k]}</th>)}
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(
                            t => (
                                <tr key={t.id}>
                                    {
                                        todoKeys.map(k => t[k])
                                            .map(v => typeof v == 'boolean' ? v.toString() : v)
                                            .map(v => <td key={v}>{v}</td>)
                                    }
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(t.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateTodo(t.id)}>Update</button></td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <div className="btn btn-success m-5" onClick={addNewTodo} >Add new Todo</div>
        </div>
    )
}

export default TodosListComponent