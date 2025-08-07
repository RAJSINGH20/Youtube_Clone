import asyncHandler from "../utiles/asynchandler.js";
import jwt from "jsonwebtoken";
import {ApiError} from "../utiles/ApiError.js";
import {User} from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.AccessToken  || req.header.Authorization?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "Access denied, no token provided" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    const user = await User.findById(decodedtoken?._id).select("-password -refreshToken")
      if (!user) {
          throw new ApiError(401, "User not found");
      }
      req.user = user;
      next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
    
  }
});
