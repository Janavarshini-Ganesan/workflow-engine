import Step from "../models/Step.js";
import Workflow from "../models/Workflow.js";
import mongoose from "mongoose";

// ADD STEP
export const addStep = async (req, res) => {
  try {

    const { workflow_id } = req.params;
    const { name, step_type, order, metadata } = req.body;

    const workflow = await Workflow.findById(workflow_id);

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    const step = new Step({
      workflow_id,
      name,
      step_type,
      order,
      metadata
    });

    const savedStep = await step.save();

    res.status(201).json(savedStep);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET STEPS OF A WORKFLOW
export const getSteps = async (req, res) => {
  try {

    const { workflow_id } = req.params;

    const steps = await Step.find({ workflow_id }).sort({ order: 1 });

    res.json(steps);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStepById = async (req, res) => {
  try {
    const step = await Step.findById(req.params.id);

    if (!step) {
      return res.status(404).json({ message: "Step not found" });
    }

    res.json(step);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STEP
export const updateStep = async (req, res) => {
  try {

    const step = await Step.findById(req.params.id);

    if (!step) {
      return res.status(404).json({ message: "Step not found" });
    }

    step.name = req.body.name || step.name;
    step.step_type = req.body.step_type || step.step_type;
    step.order = req.body.order || step.order;
    step.metadata = req.body.metadata || step.metadata;

    const updatedStep = await step.save();

    res.json(updatedStep);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE STEP
import Step from "../models/Step.js";
import Rule from "../models/Rule.js";

export const deleteStep = async (req, res) => {
  try {

    const stepId = req.params.id;

    console.log("Deleting step:", stepId);

    // 🔍 DEBUG - check rules before delete
    const rulesBefore = await Rule.find({ step_id: stepId });
    console.log("Rules before delete:", rulesBefore);

    // 🔥 DELETE RULES (safe method)
    await Rule.deleteMany({
      $or: [
        { step_id: stepId },
        { step_id: new mongoose.Types.ObjectId(stepId) }
      ]
    });

    // 🔥 DELETE STEP
    await Step.findByIdAndDelete(stepId);

    res.json({
      message: "Step and its rules deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
