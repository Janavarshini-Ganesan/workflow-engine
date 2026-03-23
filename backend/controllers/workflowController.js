import Workflow from "../models/Workflow.js";
import Step from "../models/Step.js";
import Rule from "../models/Rule.js";
import Execution from "../models/Execution.js";

// CREATE WORKFLOW
export const createWorkflow = async (req, res) => {
  try {
    const { name, input_schema } = req.body;

    const workflow = new Workflow({
      name,
      input_schema
    });

    const savedWorkflow = await workflow.save();

    res.status(201).json(savedWorkflow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL WORKFLOWS
export const getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find();

    res.json(workflows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET WORKFLOW DETAILS
export const getWorkflowById = async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    const steps = await Step.find({ workflow_id: workflow._id });

    const rules = await Rule.find({
      step_id: { $in: steps.map((s) => s._id) }
    });

    res.json({
      workflow,
      steps,
      rules
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE WORKFLOW (NEW VERSION)
export const updateWorkflow = async (req, res) => {
  try {

    const workflow = await Workflow.findById(req.params.id);

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    // update fields if provided
    workflow.name = req.body.name || workflow.name;
    workflow.input_schema = req.body.input_schema || workflow.input_schema;

    if (req.body.start_step_id !== undefined) {
      workflow.start_step_id = req.body.start_step_id;
    }

    // increase version
    workflow.version += 1;

    const updatedWorkflow = await workflow.save();

    res.json(updatedWorkflow);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE WORKFLOW
export const deleteWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    // 1. Get all steps
    const steps = await Step.find({ workflow_id: workflow._id });

    const stepIds = steps.map(step => step._id);

    // 2. Delete rules
    await Rule.deleteMany({ step_id: { $in: stepIds } });

    // 3. Delete steps
    await Step.deleteMany({ workflow_id: workflow._id });

    // 4. Delete workflow
    await workflow.deleteOne();

    res.json({ message: "Workflow, steps and rules deleted successfully" });

  } catch (error) {
    console.error(error); // 🔥 add this
    res.status(500).json({ message: error.message });
  }
};
