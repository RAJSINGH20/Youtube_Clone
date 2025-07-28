import connectToDatabase from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});


connectToDatabase()
.then(() => {
    app.listen(process.env.PORT ||3000), () => {
        console.log(`server is running on port, ${process.env.PORT || 3000}`);
    }
}).catch((err) => {
    console.log(`error connecting to database: ${err.message}`);
});































// import dotenv from "dotenv"

// import moongose from "mongoose";
// // import { DB_NAME } from "./constants.js";
// // import express from "express";
// import connectToDatabase from "./db/index.js";


// // First type

// /*(async () => {
//   try {
//     await moongose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", () => {
//       console.error("Error connecting to the database");
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//     console.log("Connected to MongoDB successfully");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// })();
// */

// // Second type

// connectToDatabase()
