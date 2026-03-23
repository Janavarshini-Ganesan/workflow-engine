import express from "express";

import {
  addRule,
  getRules,
  getStepById,
  updateRule,
  deleteRule
} from "../controllers/ruleController.js";

const router = express.Router();


// ADD RULE
router.post("/steps/:step_id/rules", addRule);


// GET RULES
router.get("/steps/:step_id/rules", getRules);

router.get("/steps/:id", getStepById);

// UPDATE RULE
router.put("/rules/:id", updateRule);


// DELETE RULE
router.delete("/rules/:id", deleteRule);


export default router;
