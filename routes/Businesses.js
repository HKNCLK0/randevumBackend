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

const router = express.Router();

//router.post("/", createBusinesses);
router.get("/", getAllBusinesses);
router.get("/:id", getBusinessesByID);
router.post("/", getBusinessesByCategoryName);
router.put("/setMeetsDates", setMeetDates);
router.put("/setMeetsTimes", setMeetTimes);

//Business Auth Router

router.post("/login", businessLogin);
router.post("/register", businessRegister);

export default router;
