import express from "express"
import { addProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/projectController.js"
import { getProjectWithTasks } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router()


//// rotect middleware isliye lagate hain taaki sirf authenticated (logged-in) user hi project APIs access kar sake.
// yeha isliaye protect use kr raha hi .... 
router.get("/getprojects", protect, getProjects);
router.post("/addprojects", protect, addProject);
router.delete("/removeproject/:id", protect, deleteProject);
router.put("/updateproject/:id", protect, updateProject);
router.get("/getbyid/:id", protect, getProjectById);

// ye project ke taraf jyada inclined hai isliya ese project Route ma rkha hai ... 
router.get("/:id/details",protect , getProjectWithTasks);

export default router


/* 

router.post("/addprojects", protect, addProject);
Iska meaning:
1. Request /addprojects par aayegi.
2. Pehle protect execute hoga.
3. JWT valid hua toh addProject execute hoga.
4. JWT invalid hua toh 401 response milega.


*/