import express from "express";
import {
  startExecution,
  getExecutions
} from "../controllers/executionController.js";

const router = express.Router();

// Start execution
router.post("/start/:workflow_id", startExecution);

// Get all executions
router.get("/", getExecutions);

export default router;