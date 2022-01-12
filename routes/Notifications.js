import express from "express";

import {
  getNotificationsByID,
  createNotifications,
  deleteNotifications,
} from "../controllers/Notifications.js";

const router = express.Router();

router.get("/:userID", getNotificationsByID);
router.post("/", createNotifications);
router.delete("/:notificationID", deleteNotifications);

export default router;
