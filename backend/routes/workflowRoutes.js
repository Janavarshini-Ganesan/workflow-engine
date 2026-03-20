import express from "express";

import {
  createWorkflow,
  getWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow
} from "../controllers/workflowController.js";

const router = express.Router();


router.post("/", createWorkflow);

router.get("/", getWorkflows);

router.get("/:id", getWorkflowById);

router.put("/:id", updateWorkflow);

router.delete("/:id", deleteWorkflow);


export default router;