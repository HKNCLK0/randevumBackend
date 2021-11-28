import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userID: String,
  token: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const Token = mongoose.model("Tokens", tokenSchema);

export default Token;
