// logic and brain of authentication will be handled here
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        
        // simple validation
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ $or: [ { email }, { username }]});
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email or username already exists"
            });
        }

        // hash the password
        const hashedPassword = bcrypt.hashSync(password, process.env.BCRYPT_SALT_ROUNDS || 10);
        req.body.password = hashedPassword;

        const newUser = await User.create(req.body);
        res.status(201).json({
            success: true,
            message: "user registered successfully",
            newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "user registration failed",
            error: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    // login user logic will be here
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
            if (isPasswordCorrect) {
                return res.status(200).json({
                    success: true,
                    message: "User logged in successfully",
                    user: existingUser
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password"
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            });
        }
    } catch (error) {
        
    }
}

// getting all the users from the database
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "all users fetched successfully",
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};