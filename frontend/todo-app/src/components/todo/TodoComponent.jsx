import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createTodo, retrieveTodoById, updateTodoById } from "./api/TodoApi"
import { useAuth } from "./security/AuthContext"

import { Formik, Form, Field, ErrorMessage } from "formik"
import moment from 'moment'

export default function TodoComponent() {

    const {id} = useParams()

    const authContext = useAuth()
    const username = authContext.username

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')


    useEffect(retrieveTodo, [username, id])

    const navigate = useNavigate()

    function retrieveTodo() {

        if (id !== '-1') {
            retrieveTodoById(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(console.log)
        }
    }

    function submit(values) {
        const todo = { description: values.description, targetDate: values.targetDate }

        if (id !== '-1') {
            updateTodoById(username, id, todo)
                .then(() => navigate('/todos'))
                .catch(console.log)
        } else {
            createTodo(username, todo)
                .then(() => navigate('/todos'))
                .catch(console.log)
        }
    }

    function validate(values) {
        let errors = {}

        if (values.description.length < 5) errors.description = 'Enter at least 5 characters'
        if (!moment(values.targetDate).isValid()) errors.targetDate = 'Enter a valid target date'

        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={ {description, targetDate} } enableReinitialize={true} onSubmit={submit} validate={validate} 
                        validateOnChange={false} validateOnBlur={false} >
                    {
                        props => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}