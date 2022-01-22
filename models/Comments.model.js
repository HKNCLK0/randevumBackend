import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
  businessID: String,
  commentPoint: String,
  commentText: String,
  createdAt: String,
});

const Comment = mongoose.model("Comments", commentsSchema);

export default Comment;
