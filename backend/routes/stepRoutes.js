import express from "express";

import {
  addStep,
  getSteps,
  updateStep,
  deleteStep,
  getStepById
} from "../controllers/stepController.js";

const router = express.Router();


// ADD STEP
router.post("/workflows/:workflow_id/steps", addStep);


// GET STEPS
router.get("/workflows/:workflow_id/steps", getSteps);

router.get("/steps/:id", getStepById);

// UPDATE STEP
router.put("/steps/:id", updateStep);

// DELETE STEP
router.delete("/steps/:id", deleteStep);


export default router;
