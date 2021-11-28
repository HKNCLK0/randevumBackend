import express from "express";

import {
  createCategory,
  getCategory,
  getCategoryByID,
} from "../controllers/Category.js";

const router = express.Router();

router.get("/", getCategory);
router.get("/:id", getCategoryByID);
router.post("/", createCategory);

export default router;
