import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter the Title ..."],
        trim: true
    },

    description: {
        type: String
    }

    ,

    status: {
        type: String,
        // enum => kon kon alowed hai ... 
        enum: ["todo", "in-progress", "completed"],
        default: "todo"
    },


    /* 
    project => 
    Ye Task document ke andar field ka naam hai.
    Example: tumhare paas TeamTask Pro naam ka project hai 
    aur uske andar Complete React Revision task hai.
 */

    /* Concept: Har task project field ke through apne parent project se linked hoga. */

    project: {
        type: mongoose.Schema.Types.ObjectId, // MongoDB har Project ko ek unique _id deta hai.
        required: true,
        ref: "Project" // Ye Mongoose ko batata hai ki project field mein jo ID hai, woh Project model ke document ko refer karti hai.
    }
},

    {
        timestamps: true
    }
)


const Task = mongoose.model("Task", taskSchema)
export default Task 