import Execution from "../models/Execution.js";
import Workflow from "../models/Workflow.js";
import { executeWorkflow } from "../services/workflowExecutor.js";


// START WORKFLOW EXECUTION
export const startExecution = async (req, res) => {
  try {
    const { workflow_id } = req.params;

    const workflow = await Workflow.findById(workflow_id);
    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    // 🔥 RUN WORKFLOW
    const logs = await executeWorkflow(workflow_id, req.body);

    // 🔥 SAVE EXECUTION
    const execution = new Execution({
      workflow_id,
      workflow_version: workflow.version,
      status: "completed",
      data: req.body,
      logs
    });

    const savedExecution = await execution.save();

    // 🔥 IMPORTANT FIX (RETURN LOGS EXPLICITLY)
    res.json({
      ...savedExecution._doc,
      logs: logs   // 👈 THIS IS THE FIX
    });

  } catch (error) {
    console.error("Execution Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// GET EXECUTION STATUS



// GET ALL EXECUTIONS
export const getExecutions = async (req, res) => {
  try {
    const executions = await Execution.find().sort({ createdAt: -1 });
    res.json(executions);
  } catch (error) {
    console.error("Execution Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getAllExecutions = async (req, res) => {
  try {
    const executions = await Execution.find().sort({ createdAt: -1 });
    res.json(executions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

