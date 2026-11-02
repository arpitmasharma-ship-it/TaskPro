import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb Connected Successfully ... ")
    } catch (error) {
        console.error("MongoDb Conncetion error is Here ... ")
        process.exit(1) //Ye Node.js application ko error ke saath stop kar deta hai. 
    }
}

export default connectDb