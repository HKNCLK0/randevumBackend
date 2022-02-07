import express from "express";
import {
  getMeets,
  getMeetsByID,
  createMeet,
  deleteMeetByID,
  getMeetsByBusinessID,
  getMeetByMeetID,
} from "../controllers/Meet.js";
import { checkBusinessAuth, checkUserAuth } from "../middleware/Middleware.js";

const router = express.Router();

//http://URL:PORT/meets

//router.get("/", getMeets);
router.get("/", checkUserAuth, getMeetsByID);
router.get("/business", checkBusinessAuth, getMeetsByBusinessID);
router.post("/", checkUserAuth, createMeet);
router.delete("/:id", checkUserAuth, deleteMeetByID);
router.get("/getByMeetID/:id", getMeetByMeetID);

export default router;
