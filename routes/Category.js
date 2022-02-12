import express from "express";

import {
  createCategory,
  getCategory,
  getCategoryByID,
} from "../controllers/Category.js";
import { checkUserAuth } from "../middleware/Middleware.js";

const router = express.Router();

router.get("/", getCategory);
router.get("/:id", getCategoryByID);
router.post("/", createCategory);

export default router;
