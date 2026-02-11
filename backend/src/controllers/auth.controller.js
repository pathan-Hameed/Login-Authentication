// logic and brain of authentication will be handled here
import { generateToken } from "../../utils/generateToken.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // simple validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists",
        });
      }
      if (existingUser.username === username) {
        return res.status(409).json({
          success: false,
          message: "User with this username already exists",
        });
      }
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
    );

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "user registered successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user registration failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body);
  
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({ success: false, message: "user not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isPasswordCorrect) {
    return res.status(404).json({ success: false, message: "wrong password" });
  }

  const token = generateToken(existingUser._id);

  const { password: _, ...safeUser } = existingUser._doc;

  return res
    .status(200)
    .json({ success: true, message: "login successfull", token, data: safeUser });
};

// getting all the users from the database
export const  getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "all users fetched successfully",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
