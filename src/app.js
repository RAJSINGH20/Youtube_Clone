import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin :process.env.CORS_ORIGIN,
    Credentials:true
}));

app.use(express.json({
    limit: '16kb'
}));

app.use(express.urlencoded({
    limit: '16kb',
    extended: true
}));
app.use(express.static('public'));

app.use(cookieParser());


// Importing routes
import userRouter from './routes/user.routes.js';

// route declaration
app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running at : ${process.env.PORT}`);
});
export default app;