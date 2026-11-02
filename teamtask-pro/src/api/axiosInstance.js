/* 
Bhai, ab hum ek Axios Instance with Request Interceptor banayenge. Isse har API request ke saath token automatically attach ho jayega.
 */

/* 

axios.create() => creates a reusable Axios instance.
interceptors.request.use() =>  runs before every request made through this instance.
Interceptor request server par bhejne se pehle execute hota hai.

config => contains request details, including headers.
return config => allows the request to continue.
Bearer =>  is the authentication scheme expected by your backend middleware.


 */

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Read token from localStorage
        const token = localStorage.getItem("token");

        // Attach token to request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
