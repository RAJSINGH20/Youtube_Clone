import express from "express";
import multer from "multer";
import {LoginUser, logoutUser, registerUser} from "../controllers/user.control.js";
import storage from "../middlewares/multer.midleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";


const upload = multer({ storage });

const router = express.Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(
    LoginUser
)


// secured Routes
router.route("/logout").post( verifyJWT, logoutUser);

export default router;