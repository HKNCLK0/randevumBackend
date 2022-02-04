import express from "express";
import {
  getMeets,
  getMeetsByID,
  createMeet,
  deleteMeetByID,
  getMeetsByBusinessID,
  getMeetByMeetID,
} from "../controllers/Meet.js";
import { middleware } from "../middleware/Middleware.js";

const router = express.Router();

//http://URL:PORT/meets

//router.get("/", getMeets);
router.get("/", middleware, getMeetsByID);
router.get("/business/:id", middleware, getMeetsByBusinessID);
router.post("/", middleware, createMeet);
router.delete("/:id", middleware, deleteMeetByID);
router.get("/getByMeetID/:id", getMeetByMeetID);

export default router;
