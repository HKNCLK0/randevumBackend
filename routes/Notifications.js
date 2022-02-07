import express from "express";

import {
  getNotificationsByID,
  createNotifications,
  deleteNotifications,
} from "../controllers/Notifications.js";
import { checkUserAuth } from "../middleware/Middleware.js";

const router = express.Router();

router.get("/", checkUserAuth, getNotificationsByID);
router.post("/", createNotifications);
router.delete("/:notificationID", deleteNotifications);

export default router;
