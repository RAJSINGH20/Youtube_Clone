import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Disable buffering to prevent timeout errors
        mongoose.set('bufferCommands', false);
        
        console.log("🔄 Connecting to MongoDB...");
        
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            // Essential connection options to prevent timeout
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 75000, // 75 seconds
            bufferMaxEntries: 0, // Disable mongoose buffering
            bufferCommands: false, // Disable mongoose buffering
            maxPoolSize: 10,
            minPoolSize: 5,
            connectTimeoutMS: 60000, // 60 seconds
        });
        
        console.log(`✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
        console.log(`📊 Database Name: ${connectionInstance.connection.name}`);
        console.log(`📡 Connection State: ${mongoose.connection.readyState}`);
        
        return connectionInstance;
        
    } catch (error) {
        console.log("❌ MongoDB connection error:", error.message);
        console.log("🔍 Error details:", {
            code: error.code,
            codeName: error.codeName,
            name: error.name
        });
        
        // Don't exit immediately, let the app handle retries
        throw error;
    }
};

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('📡 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.log('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('📴 Mongoose disconnected from MongoDB');
});

// Handle process termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('📴 MongoDB connection closed due to app termination');
    process.exit(0);
});

export default connectDB;