import asynchandler from "../utiles/asynchandler.js";
import ApiError  from "../utiles/ApiError.js";
import user from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

const registeruser = asynchandler(async (req, res) => {
  // get user deatils from frontend
  // validation - not empty
  // cheak if user already exists: username and email
  // cheak for images, cheak for avatar
  // upload them to cloudinary
  // create user object -- creaye entry in db
  // remove password and refresh token from object
  // cheak for user creation
  // send response

  const { fullname, email, username, password } = req.body;
  console.log("email:", email);
  console.log("password:", password);

  // Validate that none of the fields are empty or just whitespace
  if ([fullname, email, username, password].some((field) => !field?.trim())) {
    throw new ApiError(
      "All fields (fullname, email, username, password) are required",
      400
    );
  }
  const existeduser = user.findOne({ $or: [{ email }, { username }] });

  if (existeduser) {
    throw new ApiError("User already exists", 409);
  }

  const avatarLocalPath=req.files?.avatar[0]?.path
  const coverimgLocalPath=req.file?.coverimg[0]?.path

  if(!avatarLocalPath || !coverimgLocalPath) {
    throw new ApiError("Avatar and cover image are required", 400);
  }
  const avatar = await cloudinary.uploader.upload(avatarLocalPath);
  const coverimg = await cloudinary.uploader.upload(coverimgLocalPath);
  
  if(!avatar){
    throw new ApiError("Avatar and are required", 400);
  }
  await user.create({
    fullname,
    avatar: avatar.url,
    coverimg: coverimg?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createduser = await user
    .findbyid(user._id)
    .select("-password -refreshToken");

    if (!createduser) {
      throw new ApiError("User creation failed", 500);
    }
    return res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: createduser,
    });
});

export default registeruser;
