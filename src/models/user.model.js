import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
      trim: true,
    },
    coverimage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refershToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
    if(this.ismodified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        next()
    }else{
        next()
    }
    
})

userSchema.methods.ispasswordCorrect = async function(Password) {
  return await bcrypt.compare(Password, this.password);
};
userSchema.methods.genrateAccessToken = async function() {
  jwt.sign(
    {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },
    process.env.ACCESS_TOKEB_SECERETE,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "1d",
    }
  )
};
userSchema.methods.genrateRefershToken = async function() {
  jwt.sign(
    {
        _id: this._id,
       
    },
    process.env.ACCESS_TOKEB_SECERETE,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "1d",
    }
  )
};

export const User = mongoose.model("User", userSchema);
