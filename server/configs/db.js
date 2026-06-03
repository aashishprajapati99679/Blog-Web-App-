import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("CRITICAL: MONGODB_URI environment variable is not defined!");
        return;
    }
    try {
        mongoose.connection.on('connected', () =>
            console.log("Database Connected")
        );

        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`);
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
};

export default connectDB;