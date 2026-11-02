// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:5000/api/tasks"
// })


// export const getAllTasks = () => API.get("getalltasks")
// export const createTask = (data) => API.post("/createtask", data)
// export const getTasksByProject = (projectId) => API.get(`/project/${projectId}`)
// export const updateTask = (id, data) => API.put(`/updatetask/${id}`, data)
// export const deleteTask = (id) => API.delete(`/deletetask/${id}`)



import axiosInstance from "./axiosInstance";

export const getAllTasks = () =>
    axiosInstance.get("/tasks/getalltasks");

export const createTask = (data) =>
    axiosInstance.post("/tasks/createtask", data);

export const getTasksByProject = (projectId) =>
    axiosInstance.get(`/tasks/project/${projectId}`);

export const updateTask = (id, data) =>
    axiosInstance.put(`/tasks/updatetask/${id}`, data);

export const deleteTask = (id) =>
    axiosInstance.delete(`/tasks/deletetask/${id}`);
