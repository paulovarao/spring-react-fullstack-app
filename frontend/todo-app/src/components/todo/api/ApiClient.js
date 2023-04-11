import axios from "axios"

const apiUrl = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}` : 'http://localhost:8080'

export const apiClient = axios.create({baseURL: apiUrl})