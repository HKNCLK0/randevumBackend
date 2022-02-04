import express from "express";

import {
  getNotificationsByID,
  createNotifications,
  deleteNotifications,
} from "../controllers/Notifications.js";
import { middleware } from "../middleware/Middleware.js";

const router = express.Router();

router.get("/", middleware, getNotificationsByID);
router.post("/", createNotifications);
router.delete("/:notificationID", deleteNotifications);

export default router;
