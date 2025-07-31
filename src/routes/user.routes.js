import registeruser from "../controllers/user.control.js";
import router from "express";
import { upload } from "../middlewares/multer.midleware.js";
const Router = router();

Router.post("/register", registeruser).post(
    upload.fields([
        {
            name: "avatar", 
            maxCount: 1
        },
        {
            name: "coverimg",
            maxCount: 1
        },
        {
            
        }
    ]),
); // POST /api/v1/users/register


export default Router;
