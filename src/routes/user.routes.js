import router from "express";
import registeruser from "../controllers/user.control.js";


const Router = router();

router.Router('/register').post(registeruser);


export default Router;