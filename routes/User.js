import express from "express";
import { deleteUser, getUser, getUserByID } from "../controllers/User.js";

const router = express.Router();

//http://URL:PORT/meets
router.get("/", getUser);
router.get("/:id", getUserByID);
router.delete("/:id", deleteUser);

export default router;
