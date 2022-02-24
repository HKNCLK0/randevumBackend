import express from "express";
import {
  createComment,
  getCommentByBusinessID,
} from "../controllers/Comments.js";

import { checkBusinessAuth } from "../middleware/Middleware.js";

const router = express.Router();

//http://URL:PORT/meets

router.post("/", createComment);
router.get("/:businessID", getCommentByBusinessID);

export default router;
