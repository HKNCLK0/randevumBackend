import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
  businessID: String,
  commentPoint: String,
  commentText: String,
  createdAt: { type: Date, default: () => Date.now() + 10800000 },
});

const Comment = mongoose.model("Comments", commentsSchema);

export default Comment;
