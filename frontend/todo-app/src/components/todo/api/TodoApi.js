import axios from 'axios'

const apiClient = axios.create({baseURL: 'http://localhost:8080'})

export const retrieveAllTodosForUsername = username => apiClient.get(`/users/${username}/todos`)

export const deleteTodoById = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)

export const retrieveTodoById = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoById = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)

export const createTodo = (username, todo) => apiClient.post(`/users/${username}/todos`, todo)