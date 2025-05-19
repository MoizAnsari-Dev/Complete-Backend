import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        // Your sign-up logic here
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        // Create a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        // Set the token in the response cookie
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                user: newUser,
                token,
            },
        });
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        return next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        // Set the token in the response cookie
        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        return next(error)
    }
}
export const logout = async (req, res, next) => {
    try {
        // Clear the token from the cookie
        res.clearCookie("token");
        res.status(200).json({
            status: "success",
            message: "User logged out successfully",
        });
    } catch (error) {
        return next(error)
    }   
}