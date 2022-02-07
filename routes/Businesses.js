import express from "express";
import {
  //createBusinesses,
  getAllBusinesses,
  getBusinessesByID,
  businessLogin,
  businessRegister,
  getBusinessesByCategoryName,
  setMeetDates,
  setMeetTimes,
} from "../controllers/Businesses.js";

import { checkBusinessAuth } from "../middleware/Middleware.js";

const router = express.Router();

//router.post("/", createBusinesses);
router.get("/", getAllBusinesses);
router.get("/:id", getBusinessesByID);
router.post("/", getBusinessesByCategoryName);

router.put("/setMeetsDates", checkBusinessAuth, setMeetDates);
router.put("/setMeetsTimes", checkBusinessAuth, setMeetTimes);

//Business Auth Router
router.post("/login", businessLogin);
router.post("/register", businessRegister);

export default router;
