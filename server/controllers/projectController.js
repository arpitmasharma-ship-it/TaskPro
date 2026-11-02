import Project from "../models/Project.js";


// get all the routes Here ... 
export const getProjects = async (req, res) => {
    try {

        // {createdBy: req.user} this is important bec by this we will only get the projects 
        // of the createdBy user 
        /* {createdBy: req.user}  without it we are getting projects of all the users ..... */
        const projects = await Project.find({ createdBy: req.user }).sort({ createdAt: -1 })
        return res.status(200).json({
            message: "All the Projects are Here ...",
            success: true,
            projects
        })
    } catch (error) {
        console.log("Some Error Ocured ")
        /* Server Error ke liye use 500  */
        res.status(500).json({
            message: "Some Error Occured .... ",
            success: false
        })
    }
}





// add Task Here ... 

export const addProject = async (req, res) => {
    try {
        const { name, description, status } = req.body

        if (typeof name !== "string" || !name.trim() ||
            typeof description !== "string" || !description.trim()) {
            return res.status(400).json({
                message: "Enter the valid name or description ... ",
                status: false
            })
        }

        // Validate status
        const projectStatus = status || "active";

        if (!["active", "completed"].includes(projectStatus)) {
            return res.status(400).json({
                message: "Invalid status",
                success: false
            });
        }

        const project = await Project.create({
            name: name.trim(),
            description: description.trim(),
            status: projectStatus,
            createdBy: req.user
        })
        //// 200 likh diya tha mena .... 
        return res.status(201).json({
            message: "Project Added Successfully Here ... ",
            status: true,
            project
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Something Went Wrong Here ... ",
            status: false
        })
    }
}






export const deleteProject = async (req, res) => {
    try {
        // my mistake is ki mena yeha {id} likha tha ...
        //Yahan req.params.id ek string hai, object nahi. Isliye destructuring ki zarurat nahi hai.
        const id = req.params.id
        // const deletedproject = await Project.findByIdAndDelete(id)
        const deletedproject = await Project.findOneAndDelete({
            _id : id , 
            createdBy : req.user
        })

        if (!deletedproject) {
            return res.status(404).json({
                message: "Project Not Found ... ",
                success: false
            })
        }

        return res.status(200).json({
            message: "Project Deleted Successfully ",
            success: true,
            deletedproject

        })
    } catch (error) {
        return res.status(500).json({
            message: "server Error ...",
            success: false
        })
    }
}





export const updateProject = async (req, res) => {
    try {
        const id = req.params.id
        const { name, description, status } = req.body

        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    message: "Invalid name",
                    success: false
                });
            }
        }


        if (status !== undefined) {
            if (!["active", "completed"].includes(status)) {
                return res.status(400).json({
                    message: "Invalid status",
                    success: false
                });
            }
        }

        // const updateproject = await Project.findByIdAndUpdate(id, {
        //     name,
        //     description,
        //     status
        // },
        //     {
        //         new: true // this is important to add when we are Updating the Something ...
        //     }
        // )

        const updateproject = await Project.findOne({
            _id: id,
            createdBy: req.user
        })


        if (!updateproject) {
            return res.status(404).json({
                message: "Project Not Found ... ",
                success: false
            })
        }



        ///// Updating ........  bec of security ....
        if (name !== undefined) {
            updateproject.name = name.trim();
        }

        if (description !== undefined) {
            updateproject.description = description.trim();
        }

        if (status !== undefined) {
            updateproject.status = status;
        }
        await updateproject.save();




        return res.status(200).json({
            message: "Project Updated Successfully ...",
            success: true,
            updateproject
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error ... ",
            success: false
        })
    }
}



export const getProjectById = async (req, res) => {
    try {
        const id = req.params.id

        /* Suppose:
            - Arpit ka project ID = 101
          - Rahul ka project ID = 202
          Agar Arpit Rahul ki project ID 202 se request bhejta hai, toh humein uska project access block karna hai. */


        // const idproject = await Project.findById(id) // Toh ye sirf project ID check karta hai, owner nahi.
        const idproject = await Project.findOne({
            _id: req.params.id, // 	Project ID match karo
            createdBy: req.user // Check karo ki project current user ka hai
        })
        if (!idproject) {
            return res.status(404).json({
                message: "Project Not Found ... ",
                success: false
            })
        }

        return res.status(200).json({
            message: "Project Founded  Successfully ...",
            success: true,
            idproject
        })
    } catch (error) {
        console.error("Get Project By ID Error:", error);
        return res.status(500).json({
            message: "Server Error ... ",
            success: false
        })
    }
}