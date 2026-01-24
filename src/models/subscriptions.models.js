import mongoose, { Schema } from "mongoose";
const subscriptionSchema = new mongoose.Schema({
    subscriber : {
        type : Schema.Types.ObjectId, // one who is subscribing
        ref  : "Users"
    },
    channel : {
         type : Schema.Types.ObjectId, // one who to whom subscriber is  subscribing
        ref  : "Users"

    }
},{timestamps: true});

subscriptionSchema.index(
    { subscriber: 1, channel: 1 },
    { unique: true }
  );
  
export const subscriptions = mongoose.model("Subscriptions",subscriptionSchema);