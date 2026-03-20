import Rule from "../models/Rule.js";


// evaluate single condition
const evaluateCondition = (condition, data) => {

  if (condition === "DEFAULT") return true;

  try {

    let expression = condition;

    Object.keys(data).forEach((key) => {

      const value = typeof data[key] === "string"
        ? `'${data[key]}'`
        : data[key];

      const regex = new RegExp(`\\b${key}\\b`, "g");

      expression = expression.replace(regex, value);

    });

    return eval(expression);

  } catch (error) {

    console.error("Rule evaluation error:", error);

    return false;

  }
};


// evaluate rules for a step
export const evaluateRules = async (step_id, data) => {

  const rules = await Rule.find({ step_id }).sort({ priority: 1 });

  const evaluated = [];

  for (const rule of rules) {

    const result = evaluateCondition(rule.condition, data);

    evaluated.push({
      rule: rule.condition,
      result
    });

    if (result) {
      return {
        rule,
        next_step_id: rule.next_step_id,
        evaluated_rules: evaluated
      };
    }
  }

  return {
    rule: null,
    next_step_id: null,
    evaluated_rules: evaluated
  };
};