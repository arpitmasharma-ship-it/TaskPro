// import dns from 'node:dns';
// dns.setServers(['8.8.8.8', '8.8.4.4']);
// import cors from "cors";

// import express from 'express'
// import mongoose from 'mongoose'
// import dotenv from "dotenv"
// import connectDb from './config/db.js'
// import projectRoute from "../server/routes/projectRoutes.js"
// import taskRoutes from "./routes/taskRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config()
// const app = express()

// // app.use(cors({
// //     origin: "http://localhost:5173"
// // }))

// // for deployment 
// app.use(cors({
//     origin: [
//         "http://localhost:5173",
//         "https://task-m8ofn1y5n-arpitmasharma-ship-its-projects.vercel.app"
//     ]
// }));

// const PORT = process.env.PORT || 5000;
// app.use(express.json())
// connectDb()
// let projects = []

// app.get("/", (req, res) => {
//     res.json({ message: "Team pro is Working " })
// })

// // yeha mere mistake is ki mena yeha app.get likh diya tha instead of app.use 
// app.use("/api/projects", projectRoute)
// app.use("/api/tasks", taskRoutes)
// app.use("/api/auth", authRoutes)



// app.listen(PORT, () => {
//     console.log(`Server is Running at ${PORT}`)
// })




import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import connectDb from "./config/db.js";
import projectRoute from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://task-460j40m7a-arpitmasharma-ship-its-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Database connection
connectDb();

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "TeamTask Pro Backend is Working"
    });
});

// API Routes
app.use("/api/projects", projectRoute);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
});
