import express from "express";

import {
  getPlans,
  createSession,
  getBusinessLevel,
  getCustomerByID,
  createPortal,
} from "../controllers/Plan.js";
import { checkBusinessAuth } from "../middleware/Middleware.js";

const router = express.Router();

router.get("/", getPlans);
router.post("/session", checkBusinessAuth, createSession);
router.get("/get-level", checkBusinessAuth, getBusinessLevel);
router.get("/getcustomer", checkBusinessAuth, getCustomerByID);
router.get("/portal", checkBusinessAuth, createPortal);
export default router;
