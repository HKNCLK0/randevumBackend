import express from "express";
import {
  createBusinesses,
  getAllBusinesses,
  getBusinessesByID,
} from "../controllers/Businesses.js";

const router = express.Router();

router.post("/", createBusinesses);
router.get("/", getAllBusinesses);
router.get("/:id", getBusinessesByID);

export default router;
