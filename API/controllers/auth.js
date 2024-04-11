import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import {createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

// Register function to create new user
export const register = async (req, res, next) => {
    try {
        // Generate a salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Create a new User object with hashed password
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            isAdmin: false,
        });

        // Save the new User object to the database
        await newUser.save();

        // Respond with a success message
        res.status(200).send("User " + req.body.username + " has been created.")
    } catch (error) {
        next(error);
    }
}

// Login function to authenticate a user
export const login = async (req, res, next) => {
    try {
        // Find user by the provided username
        const user = await User.findOne({username: req.body.username});
        if (!user) { return next(createError(404, "User not found!"))}

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){ return next(createError(400, "Incorrect username or password!"))};

        // Generate a json web token for the authenticated users id
        const token = jwt.sign({ id: user._id }, process.env.JWT)

        // Remove the password from the user object before sending it in the response
        const { password, ...otherDetails } = user._doc;

        // Set the token in an HTTP-only cookie for enhanced security
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ ...otherDetails }); // Respond with the user's details (excluding the password)
    } catch (error) {
        next(error)
    }
} 