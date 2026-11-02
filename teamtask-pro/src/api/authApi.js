import axios from "axios"

const API = axios.create({
    // baseURL: "http://localhost:5000/api/auth"
    // for deployment 
    baseURL: `${import.meta.env.VITE_API_URL}/auth`
})


export const register = (data) => API.post("/register", data)
export const login = (data) => API.post("/login", data)


