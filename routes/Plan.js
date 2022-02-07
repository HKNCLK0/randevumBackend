import express from "express";

import {
  getPlans,
  createSession,
  getBusinessLevel,
  updateProduct,
  getCustomerByID,
  createPortal,
} from "../controllers/Plan.js";
import { checkBusinessAuth } from "../middleware/Middleware.js";

const router = express.Router();

router.get("/", getPlans);
router.post("/session", checkBusinessAuth, createSession);
router.post("/getLevel", checkBusinessAuth, getBusinessLevel);
router.get("/update", updateProduct);
router.get("/getcustomer", checkBusinessAuth, getCustomerByID);
router.get("/portal", checkBusinessAuth, createPortal);
export default router;
