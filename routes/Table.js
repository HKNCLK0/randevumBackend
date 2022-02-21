import express from "express";

import {
  createTable,
  getBusinessTables,
  deleteTable,
} from "../controllers/Table.js";

import { checkBusinessAuth } from "../middleware/Middleware.js";

const router = express.Router();

router.post("/create", checkBusinessAuth, createTable);
router.get("/get-tables", checkBusinessAuth, getBusinessTables);
router.post("/delete", checkBusinessAuth, deleteTable);
export default router;
