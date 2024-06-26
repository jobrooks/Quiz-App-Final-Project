import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auths.js"
import userRoute from "./routes/users.js"
import quizRoute from './routes/quizzes.js'

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!")
});


// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Parse cookies sent in the request
app.use(express.json()); // Parse JSON data in the request body

// Route setup
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/quizzes", quizRoute)


// Error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// Start the server
app.listen(8000, () => {
    connect();
    console.log("Connected to backend.");
});