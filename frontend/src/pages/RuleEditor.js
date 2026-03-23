import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "../services/api";
import "./RuleEditor.css";

const RuleEditor = () => {

  const { id } = useParams(); // step_id
  const location = useLocation();

  // ✅ get workflowId from URL
  const queryParams = new URLSearchParams(location.search);
  const workflowId = queryParams.get("workflowId");

  const [rules, setRules] = useState([]);
  const [steps, setSteps] = useState([]);

  const [condition, setCondition] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [priority, setPriority] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ✅ FETCH RULES
  const fetchRules = useCallback(async () => {
    try {
      const res = await API.get(`/steps/${id}/rules`);
      setRules(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  // ✅ FETCH STEPS (correct workflow)
  const fetchSteps = useCallback(async () => {
    try {
      if (!workflowId) return;

      const res = await API.get(`/workflows/${workflowId}/steps`);
      setSteps(res.data);

    } catch (err) {
      console.error(err);
    }
  }, [workflowId]);

  useEffect(() => {
    fetchRules();
    fetchSteps();
  }, [fetchRules, fetchSteps]);

  // ✅ ADD / UPDATE RULE
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

      if (editingId) {
        // UPDATE
        await API.put(`/rules/${editingId}`, {
          condition,
          next_step_id: nextStep || null,
          priority: Number(priority)
        });
      } else {
        // CREATE
        await API.post(`/steps/${id}/rules`, {
          condition,
          next_step_id: nextStep || null,
          priority: Number(priority)
        });
      }

      // reset form
      setCondition("");
      setNextStep("");
      setPriority("");
      setEditingId(null);

      fetchRules();

    } catch (err) {
      alert(err.response?.data?.message || "Error saving rule");
    }
  };

  // ✅ EDIT RULE
  const handleEdit = (rule) => {
    setCondition(rule.condition);
    setNextStep(rule.next_step_id?._id || "");
    setPriority(rule.priority);
    setEditingId(rule._id);
  };

  // ✅ DELETE RULE
  const handleDelete = async (ruleId) => {
    const confirmDelete = window.confirm("Delete this rule?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/rules/${ruleId}`);
      fetchRules();
    } catch (error) {
      console.error(error);
      alert("Failed to delete rule");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Rule Editor</h2>

        <h3>{editingId ? "Edit Rule" : "Add Rule"}</h3>

        {/* CONDITION */}
        <input
          placeholder="Condition (or type DEFAULT)"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />

        {/* NEXT STEP */}
        <select value={nextStep} onChange={(e) => setNextStep(e.target.value)}>
          <option value="">End Workflow</option>

          {steps
            .filter((s) => s._id !== id) // avoid self-loop
            .map((s) => (
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

        <button onClick={addRule}>
          {editingId ? "Update Rule" : "Add Rule"}
        </button>

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

              <div className="rule-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(r)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(r._id)}
                >
                  Delete
                </button>
              </div>

            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default RuleEditor;