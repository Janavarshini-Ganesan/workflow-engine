import Rule from "../models/Rule.js";
import Step from "../models/Step.js";

// ADD RULE
export const addRule = async (req, res) => {
  try {
    const { step_id } = req.params;
    const { condition, next_step_id, priority } = req.body;

    const step = await Step.findById(step_id);
    if (!step) {
      return res.status(404).json({ message: "Step not found" });
    }

    // ❌ Prevent duplicate priority
    const existing = await Rule.findOne({ step_id, priority });
    if (existing) {
      return res.status(400).json({ message: "Priority already exists" });
    }

    // ❌ Condition validation
    if (!condition && condition !== "DEFAULT") {
      return res.status(400).json({ message: "Condition required" });
    }

    const rule = new Rule({
      step_id,
      condition,
      next_step_id,
      priority
    });

    const savedRule = await rule.save();
    res.status(201).json(savedRule);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET RULES
export const getRules = async (req, res) => {
  try {
    const { step_id } = req.params;

    const rules = await Rule.find({ step_id })
      .sort({ priority: 1 })
      .populate("next_step_id", "name"); // ✅ important

    res.json(rules);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE RULE
export const updateRule = async (req, res) => {
  try {
    const rule = await Rule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    rule.condition = req.body.condition ?? rule.condition;
    rule.next_step_id = req.body.next_step_id ?? rule.next_step_id;
    rule.priority = req.body.priority ?? rule.priority;

    const updatedRule = await rule.save();
    res.json(updatedRule);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE RULE
export const deleteRule = async (req, res) => {
  try {
    const rule = await Rule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    await rule.deleteOne();
    res.json({ message: "Rule deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};