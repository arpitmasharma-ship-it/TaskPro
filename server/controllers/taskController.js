
import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";


export const createTask = async (req, res) => {
    try {
        const { title, description, project, status } = req.body
        /* project => yehaa ye project id store kr raha hai ...    */

        // validation of title and description
        if (typeof title !== "string" || !title.trim()
        ) {
            return res.status(400).json({
                message: "Enter the Valid Title ... ",
                success: false
            })
        }

        // Check karo ki ID valid hai 

        if (!mongoose.Types.ObjectId.isValid(project)) {
            return res.status(400).json({
                message: "Invalid Project ID",
                success: false
            });
        }

        // project ID valid hai aur actual project exist karta hai, ye check karo.

        // const existingProject = await Project.findById(project) // Problem: Agar kisi doosre user ka project ID mil jaaye, toh unauthorized task create ho sakta hai.
        const existingProject = await Project.findOne({
            _id: project,
            createdBy: req.user
        });
        // })

        if (!existingProject) {
            return res.status(404).json({
                message: "Project Not Found",
                success: false
            });
        }

        const newTask = await Task.create({
            title: title.trim(),
            description: description.trim(),
            project,  // ye project id hai ... 
            status
        })


        return res.status(201).json({
            message: "Task Created Successfully ... ",
            success: true,
            newTask
        })


    } catch (error) {
        console.error("Create Task Error:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}




// getALl Task 

export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 })

        // iski need nhi hai  
        /* Agar koi task nahi mila, toh tasks empty array [] hoga.
         Empty array bhi truthy hota hai JavaScript mein, 
        isliye if (!tasks) kaam nahi karega. */
        // if (!tasks) {
        //     return res.status(400).json({
        //         message: "Tasks Not Found ... ",
        //         success: false,

        //     })
        // }


        return res.status(200).json({
            message: "Tasks Fetched Successfully",
            success: true,
            tasks
        });
    } catch (error) {
        console.error("Get Tasks Error:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}






/* Specific Project ke Tasks Fetch Karo */
/* Ek project ke tasks lana */
export const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });
        }

        const existingProject = await Project.findOne({
            _id: projectId,
            createdBy: req.user
        });
        console.log("Project ID:", projectId);
        console.log("Existing Project:", existingProject);

        if (!existingProject) {
            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            });
        }



        const tasks = await Task.find({
            project: projectId
        }).sort({ createdAt: -1 });
        /* Isko do parts mein samjho:
    - Task.find({ project: projectId }) — sirf wahi tasks nikaalo jinke project field mein ye ID saved hai.
    - .sort({ createdAt: -1 }) — newest task pehle dikhao. */



        return res.status(200).json({
            success: true,
            message: "Project Tasks Fetched Successfully",
            tasks
        });

    } catch (error) {
        console.error("Get Project Tasks Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update the task  ...  

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params; // ye task id  hai .... 
        const { title, description, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID"
            });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            });
        }

        if (title !== undefined) task.title = title.trim();
        if (description !== undefined) task.description = description.trim();
        if (status !== undefined) task.status = status;

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task Updated Successfully",
            task
        });
    } catch (error) {
        console.error("Update Task Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// delete the Task ...

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID"
            });
        }

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task Deleted Successfully",
            task
        });
    } catch (error) {
        console.error("Delete Task Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// get Project with Task
/* Project aur uske tasks ek saath */

export const getProjectWithTasks = async (req, res) => {
    try {
        const { id } = req.params; // URL se project ki ID milti hai.

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });
        }

        // const project = await Project.findById(id);
        const project = await Project.findOne({
            _id: id,
            createdBy: req.user
        })

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            });
        }

        // { project: id } → sirf woh tasks chahiye jinki project field ki value, di hui id ke equal hai.
        const tasks = await Task.find({ project: id })
            .sort({ createdAt: -1 });

        // this is imp 
        return res.status(200).json({
            success: true,
            message: "Project Details Fetched Successfully",
            project,
            tasks
        });
    } catch (error) {
        console.error("Get Project With Tasks Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



/* 

project 
{
  _id: "66abc123",
  name: "TeamTask Pro"
}
  


task 
{
  title: "Learn React",
  project: "66abc123"
}
  
*/