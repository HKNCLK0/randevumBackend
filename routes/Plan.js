import express from "express";

import { getPlans, createPlan, getPlanByID } from "../controllers/Plan.js";

const router = express.Router();

router.get("/", getPlans);
router.post("/", createPlan);
router.get("/:planID", getPlanByID);

export default router;
