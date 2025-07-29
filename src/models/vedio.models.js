import mongoose, { Schema } from "mongoose";

const vedioSchema = new Schema(
  {
    vediofile: {
      type: String, // cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, // cloudinary url
      required: true,
    },
    tittle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    durgation: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    ispublished: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



export const vedio = mongoose.model("vedio", vedioSchema);
