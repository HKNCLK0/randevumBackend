import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
  businessID: String,
  commentText: String,
  creatorName: String,
  createdAt: String,
  commentPoint: Number,
});

const Comment = mongoose.model("Comments", commentsSchema);

export default Comment;
