import Workflow from "../models/Workflow.js";
import Step from "../models/Step.js";
import Execution from "../models/Execution.js";
import { evaluateRules } from "./ruleEngine.js";



export const executeWorkflow = async (workflow_id, data) => {

  const workflow = await Workflow.findById(workflow_id);

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  let currentStep;

  // ✅ FIX START STEP
  if (workflow.start_step_id) {
    currentStep = await Step.findById(workflow.start_step_id);
  } else {
    currentStep = await Step.findOne({ workflow_id }).sort({ order: 1 });
  }

  const logs = [];

  while (currentStep) {

    console.log("Running Step:", currentStep.name);

    const log = {
      step_name: currentStep.name,
      step_type: currentStep.step_type,
      evaluated_rules: [],
      selected_next_step: null,
      status: "completed",
      started_at: new Date(),
      ended_at: null
    };

    const ruleResult = await evaluateRules(currentStep._id, data);

    console.log("Rule Result:", ruleResult);

    log.evaluated_rules = ruleResult?.evaluated_rules || [];

    // ✅ FIX CONDITION
    if (!ruleResult || !ruleResult.next_step_id) {
      log.ended_at = new Date();
      logs.push(log);
      break;
    }

    const nextStep = await Step.findById(ruleResult.next_step_id);

    log.selected_next_step = nextStep ? nextStep.name : null;
    log.ended_at = new Date();

    logs.push(log);

    if (!nextStep) break;

    currentStep = nextStep;
  }

  console.log("Final Logs:", logs);

  return logs;
};