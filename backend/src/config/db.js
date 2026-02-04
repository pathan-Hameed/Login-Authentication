//connect the database
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database failed to connect", error);
    }
}

export default connectDB;