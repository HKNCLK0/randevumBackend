import express from "express";
import { createNewPanel, getPanels } from "../controllers/Panel.js";

const router = express.Router();

router.get("/", getPanels);
router.post("/", createNewPanel);

export default router;
