import asynchandler from "../utiles/asynchandler.js";

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
    
    const {fullname , email , username ,password}=req.body
    console.log("email",email);
})


export default registeruser