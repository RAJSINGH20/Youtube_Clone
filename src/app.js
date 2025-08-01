import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Importing routes
import userRouter from './routes/user.routes.js';


app.use(express.json()); // For parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // For parsing form data (optional)
// route declaration
app.use("/api/v1/users", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running at : ${process.env.PORT}`);
});
export default app;