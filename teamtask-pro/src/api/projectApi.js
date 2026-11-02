// import axios from "axios"



// const API = axios.create({
//     baseURL: "http://localhost:5000/api/projects"
// })

// export const getProjects = () => API.get("/getprojects")
// export const addProject = (data) => API.post("/addprojects", data)
// export const deleteProject = (id) => API.delete(`/removeproject/${id}`)
// export const updateProject = (id, data) => API.put(`/updateproject/${id}`, data)
// export const getProjectById = (id) => API.get(`/getbyid/${id}`)

import axiosInstance from "./axiosInstance"

export const getProjects = () => axiosInstance.get("/projects/getprojects");

export const addProject = (data) => axiosInstance.post("/projects/addprojects", data);

export const deleteProject = (id) => axiosInstance.delete(`/projects/removeproject/${id}`);

export const updateProject = (id, data) => axiosInstance.put(`/projects/updateproject/${id}`, data);

export const getProjectById = (id) => axiosInstance.get(`/projects/getbyid/${id}`)