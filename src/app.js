// Load environment variables FIRST
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Middleware (removed duplicates)
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import userRouter from './routes/user.routes.js';

// Route declaration
app.use("/api/v1/users", userRouter);

// Port configuration with fallback
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at: http://localhost:${PORT}`);
    console.log(`🌍 CORS Origin: ${process.env.CORS_ORIGIN}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;