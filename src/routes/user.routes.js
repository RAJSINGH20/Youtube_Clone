import express from "express";
import multer from "multer";
import {
  ChangeCurrentPassword,
  getcurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  LoginUser,
  logoutUser,
  registerUser,
  updateAcoountDetails,
} from "../controllers/user.control.js";
import storage from "../middlewares/multer.midleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import { verify } from "jsonwebtoken";

const upload = multer({ storage });

const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(LoginUser);

// secured Routes
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/changePassword").post(verifyJWT, ChangeCurrentPassword);

router.route("/currentUser").get(verifyJWT, getcurrentUser);

router.route("/update-Account").patch(verifyJWT, updateAcoountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/coverimage")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

router.route("/history").get(verifyJWT, getWatchHistory)
export default router;
