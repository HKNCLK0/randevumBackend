import express from "express";
import { getUser, getUserByID } from "../controllers/User.js";

const router = express.Router();

//http://URL:PORT/meets
router.get("/", getUser);
router.get("/:id", getUserByID);

export default router;
