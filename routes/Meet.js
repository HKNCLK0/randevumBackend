import express from "express";
import {
  getMeets,
  getMeetsByID,
  createMeet,
  deleteMeetByID,
  getMeetsByBusinessID,
  getMeetByMeetID,
} from "../controllers/Meet.js";

const router = express.Router();

//http://URL:PORT/meets

router.get("/", getMeets);
router.get("/:id", getMeetsByID);
router.get("/business/:id", getMeetsByBusinessID);
router.post("/", createMeet);
router.post("/:id", deleteMeetByID);
router.get("/getByMeetID/:id", getMeetByMeetID);

export default router;
