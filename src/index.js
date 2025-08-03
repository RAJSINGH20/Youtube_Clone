// Load environment variables FIRST
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './src/db/index.js';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

// Debug environment variables
console.log("🔍 Environment Check:");
console.log("- PORT:", process.env.PORT);
console.log("- MongoDB URI exists:", !!process.env.MONGODB_URI);
console.log("- CORS Origin:", process.env.CORS_ORIGIN);

// Connect to database first, then start server
connectDB()
.then(() => {
    console.log("🎯 Starting server...");
    
    app.listen(PORT, () => {
        console.log(`✅ Server running at: http://localhost:${PORT}`);
        console.log(`🌍 CORS Origin: ${process.env.CORS_ORIGIN}`);
        console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
    app.on('error', (error) => {
        console.log('❌ Server Error:', error);
        throw error;
    });
})
.catch((err) => {
    console.log("💥 Failed to start application:", err);
    process.exit(1);
});