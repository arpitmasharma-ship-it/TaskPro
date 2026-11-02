import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter The Title ... "],
        trim: true  // this is jo ki ma bhul jata hu ... 
    },

    description: {
        type: String,

    },

    status: {
        type: String,
        enum: ["active", "completed"], // enum ka mtlb hai ki bs ye do value hi allowed hai yeha ... 
        default: "active"
    },


    /* Problem ye aati ahi ki ek user dusre user ke Projects and Tasks ko bhi edit 
    ya update kr saktha hai and ham ye chata hai ki user shrif apne hi projects and tasks 
    ko edit ya update kr paye ....  */
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // 	User ki unique MongoDB ID store karega
        ref: "User", // 	Batayega ki ye ID User model se related hai
        required: true
    }

},

    {
        timestamps: true
    }

)


const Project = mongoose.model("Project", ProjectSchema)
export default Project