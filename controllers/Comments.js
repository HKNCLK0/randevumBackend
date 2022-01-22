import Comment from "../models/Comments.model.js";

export const createComment = async (req, res) => {
  const date = new Date();
  const { businessID, commentPoint, commentText } = req.body;
  try {
    const comment = await Comment.create({
      businessID,
      commentPoint,
      commentText,
      createdAt: date.toLocaleDateString(),
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getCommentByBusinessID = async (req, res) => {
  const businessID = req.params.id;
  try {
    const comment = await Comment.find({ businessID: businessID });
    if (!comment) {
      res.status(404).json("Business Not Found");
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};
