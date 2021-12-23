import express from "express";
import {
  passwordReset,
  newPassword,
  getSendToken,
} from "../controllers/Password.js";

const router = express.Router();

router.post("/", passwordReset);
router.post("/new-password", newPassword);
router.post("/token", getSendToken);

export default router;
