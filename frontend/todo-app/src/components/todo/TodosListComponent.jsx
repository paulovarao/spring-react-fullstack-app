import { useEffect, useState } from "react"
import { retrieveAllTodosForUsername } from "./api/TodoApi"

function TodosListComponent() {

    const [todos, setTodos] = useState([])

    useEffect(refreshTodos, [])

    function refreshTodos() {
        retrieveAllTodosForUsername('in28minutes')
            .then(response => setTodos(response.data))
            .catch(console.log)
    }

    const todoStruct = {id: 'ID', description: 'Description', done: 'Done?', targetDate: 'Target Date'}
    const todoKeys = Object.keys(todoStruct)

    return (
        <div className="container">
            <h1>Things you want to do!</h1>
            <div>
                <table className="table" >
                    <thead>
                        <tr>
                            {todoKeys.map(k => <th key={k}>{todoStruct[k]}</th>)}
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
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodosListComponent