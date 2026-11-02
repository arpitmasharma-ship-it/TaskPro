import express from "express"
import { createTask, deleteTask, getAllTask, getProjectWithTasks, getTasksByProject, updateTask } from "../controllers/taskController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/createtask", protect ,  createTask)
router.get("/getalltasks", protect ,  getAllTask)
router.get("/project/:projectId", protect , getTasksByProject);
router.put("/updatetask/:id", protect ,  updateTask);
router.delete("/deletetask/:id", protect , deleteTask);
router.get("/:id/details", protect ,  getProjectWithTasks);
export default router