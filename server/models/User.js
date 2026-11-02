    import mongoose from "mongoose";

    const userSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, "Enter the name"],
                trim: true
            },

            email: {
                type: String,
                required: [true, "Enter the email"],
                unique: true,
                lowercase: true,
                trim: true
            },

            password: {
                type: String,
                required: [true, "Enter the password"],
                minlength: [6, "Password must be at least 6 characters"]
            }
        },
        {
            timestamps: true
        }
    );

    const User = mongoose.model("User", userSchema);

    export default User;