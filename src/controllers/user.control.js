import asynchandler from "../utiles/asynchandler.js";
import {ApiError}  from "../utiles/ApiError.js";


const registerUser = asynchandler( async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res



  // get data from the request body



  const { fullName, email, username, password } = req.body;
  console.log("username: ", username);

  
  // check if any field is empty
  
  
  if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  
  
  // check if user already exists
  
  
  const existedUser = await users.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  console.log(req.files);
  
  // check if avatar is present
  
  
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
  // check if cover image is present

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  
  
  // if cover image is not present, set it to null
  
  
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  
  
  // if avatar is not present, throw an error
  
  
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  
  
  //create user object
  
  
  const users = await users.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  
  
  // remove password and refresh token from the response
  
  
  const createdUser = await users
    .findById(users._id)
    .select("-password -refreshToken");
    // if user is not created, throw an error
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  
  
  // return response
  
  
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
} )

export { registerUser };
