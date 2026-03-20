import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./RuleEditor.css";

const RuleEditor = () => {

  const { id } = useParams();

  const [rules, setRules] = useState([]);
  const [steps, setSteps] = useState([]);

  const [condition, setCondition] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [priority, setPriority] = useState("");

  // FETCH RULES
  const fetchRules = useCallback(async () => {
    try {
      const res = await API.get(`/steps/${id}/rules`);
      setRules(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  // FETCH STEPS
  const fetchSteps = useCallback(async () => {
    try {
      const res = await API.get("/workflows");
      if (res.data.length > 0) {
        const wfId = res.data[0]._id;
        const stepRes = await API.get(`/workflows/${wfId}/steps`);
        setSteps(stepRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchRules();
    fetchSteps();
  }, [fetchRules, fetchSteps]);

  // ADD RULE
  const addRule = async () => {
    try {

      if (!priority) {
        alert("Priority required");
        return;
      }

      if (!condition && condition !== "DEFAULT") {
        alert("Condition required or use DEFAULT");
        return;
      }

      await API.post(`/steps/${id}/rules`, {
        condition,
        next_step_id: nextStep || null,
        priority: Number(priority)
      });

      setCondition("");
      setNextStep("");
      setPriority("");

      fetchRules();

    } catch (err) {
      alert(err.response?.data?.message || "Error adding rule");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Rule Editor</h2>

        <h3>Add Rule</h3>

        {/* CONDITION */}
        <input
          placeholder="Condition (or type DEFAULT)"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />

        {/* NEXT STEP */}
        <select value={nextStep} onChange={(e) => setNextStep(e.target.value)}>
          <option value="">End Workflow</option>
          {steps.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* PRIORITY */}
        <input
          placeholder="Priority (1,2,3...)"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />

        <button onClick={addRule}>Add Rule</button>

        <h3>Rules List</h3>

        <ul className="rule-list">
          {rules.map((r) => (
            <li key={r._id} className="rule-item">

              <span className="priority-badge">P{r.priority}</span>

              <span className="rule-text">
                {r.condition === "DEFAULT" ? "DEFAULT" : r.condition}
                {" → "}
                {r.next_step_id?.name || "END"}
              </span>

            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default RuleEditor;