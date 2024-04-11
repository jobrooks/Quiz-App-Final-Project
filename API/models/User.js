import mongoose from "mongoose"

// Define the UserSchema using mongoose.Schema
const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        isAdmin:{
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

// Export the model using the "User" name and the defined schema
export default mongoose.model("User", UserSchema)