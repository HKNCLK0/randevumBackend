import express from "express";
import {
  createComment,
  getCommentByBusinessID,
} from "../controllers/Comments.js";

const router = express.Router();

//http://URL:PORT/meets

router.post("/", createComment);
router.get("/:id", getCommentByBusinessID);

export default router;
