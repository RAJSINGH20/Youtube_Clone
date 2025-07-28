import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
// import express from "express";

const connectToDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); 
        console.log(`✅ Connected to MongoDB! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1); // This is good to stop server if DB connection fails
    }
};

export default connectToDatabase;
