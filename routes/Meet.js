import express from "express";
import { getMeets, getMeetsByID, createMeet } from "../controllers/Meet.js";

const router = express.Router();

//http://URL:PORT/meets

router.get("/", getMeets);
router.get("/:id", getMeetsByID);
router.post("/", createMeet);

export default router;
