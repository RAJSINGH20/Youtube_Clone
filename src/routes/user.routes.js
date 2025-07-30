import express from "express";
import registeruser from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registeruser); // POST /api/v1/users/register

export default router;
