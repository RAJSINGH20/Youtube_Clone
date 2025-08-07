import mongoose, { Schema } from "mongoose";
const SubscriptionSchema = new Schema({
  subcriber: {
    type: Schema.Types.ObjectId, // one who is subcribing
    ref: "User",
  },
  Channel: {
    type: Schema.Types.ObjectId, // one  to whom subcribing
    ref: "User",
  },

},{Timestamp:true});

export const Subscription = mongoose.model("Subscription", SubscriptionSchema);
