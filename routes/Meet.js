import express from "express";
import {
  getMeets,
  getMeetsByID,
  createMeet,
  deleteMeetByID,
} from "../controllers/Meet.js";

const router = express.Router();

//http://URL:PORT/meets

router.get("/", getMeets);
router.get("/:id", getMeetsByID);
router.post("/", createMeet);
router.post("/:id", deleteMeetByID);

export default router;
