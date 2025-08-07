import asynchandler from "../utiles/asynchandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/apirespone.js"; // ADD THIS IMPORT
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utiles/Cloudinary.js";
import jwt from "jsonwebtoken";

const genrateAcessAndRefreshToken = async (user) => {
  // Generate access and refresh tokens
  try {
    const User = await User.findById(user._id);
    const AccessToken = User.generateAccessToken();
    const RefreshToken = User.generateRefreshToken();

    user.refreshToken = RefreshToken;
    await user.save((vaidateBeforeSave = false));
    return { AccessToken, RefreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new ApiError(500, "Failed to generate tokens");
  }
};

const registerUser = asynchandler(async (req, res) => {
    try {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
  
    const { fullName, email, username, password } = req.body;
    console.log("email: ", email);
  
    if (
      [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }
  
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }
    //console.log(req.files);
  
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
  
    let coverImageLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    ) {
      coverImageLocalPath = req.files.coverImage[0].path;
    }
  
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }
  
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  
    if (!avatar) {
      throw new ApiError(400, "Avatar file is required");
    }
  
    const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
  
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
} catch (error) {
    console.error("Error in registerUser:", error);
    throw new ApiError(500, "Internal server error during user registration");
}
});

const LoginUser = async (req, res) => {
  // req - body is data le ao
  // username or email and password
  // find user by user
  // compare password
  // access and refresh token
  // send cookies

  const [email, username, password] = req.body;

  if (!email || !username) {
    throw new ApiError(400, "username or email  required");
  }
  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }
  // Compare password\
  const ispasswordvalid = await user.ispasswordCorrect(password);
  if (!ispasswordvalid) {
    throw new ApiError(401, "password is incorrect");
  }

  // Generate access and refresh tokens

  const { AccessToken, RefreshToken } = await genrateAcessAndRefreshToken(
    user._id
  );

  const loggedinuser = await user
    .findById(user._id)
    .select("-password -refreshToken");

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("AccessToken", AccessToken, option)
    .cookie("RefreshToken", RefreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinuser,
          AccessToken,
          RefreshToken,
        },
        "User logged in successfully"
      )
    );
};

const logoutUser = async (req, res) => {
  // Clear cookies
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("AccessToken", null, option)
    .cookie("RefreshToken", null, option)
    .json(
      new ApiResponse(
        200,
        {
          message: "User logged out successfully",
        },
        "User logged out successfully"
      )
    );
};


const refreshAccessToken = asynchandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

export { registerUser, LoginUser, logoutUser };
