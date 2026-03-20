import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./ExecutionPage.css";

const ExecutionPage = () => {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    amount: "",
    country: "",
    priority: ""
  });

  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const executeWorkflow = async () => {
    try {
      const res = await API.post(`/executions/start/${id}`, formData);

      console.log("Execution Response:", res.data);

      // ✅ SUCCESS MESSAGE
      setMessage("Workflow executed successfully!");

      // ✅ SAFE LOG HANDLING
      if (res.data.logs && res.data.logs.length > 0) {
        setLogs(res.data.logs);
      } else if (res.data.execution?.logs) {
        setLogs(res.data.execution.logs);
      } else {
        setLogs([]); // reset
        console.warn("No logs found in response");
      }

    } catch (error) {
      console.error(error);
      alert("Execution failed");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Execute Workflow</h2>

        <h3>Input</h3>

        <input
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <input
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />

        <input
          name="priority"
          placeholder="Priority (High/Low)"
          value={formData.priority}
          onChange={handleChange}
        />

        <button onClick={executeWorkflow}>
          Execute
        </button>

        {/* ✅ SUCCESS MESSAGE */}
        {message && <p className="success-msg">{message}</p>}

        <h3>Execution Logs</h3>

        {/* ✅ EMPTY STATE */}
        {logs.length === 0 && (
          <p className="empty-msg">No execution logs available</p>
        )}

        {logs.map((log, index) => (
          <div key={index} className="log-card">

            <div className="log-title">
              {log.step_name} ({log.step_type})
            </div>

            <p>
              Status:{" "}
              <span className={
                log.status === "completed"
                  ? "status-success"
                  : "status-failed"
              }>
                {log.status}
              </span>
            </p>

            <p>Next: {log.selected_next_step || "END"}</p>

            <p><b>Rules Evaluated:</b></p>

            <ul className="rule-list">
              {log.evaluated_rules?.length > 0 ? (
                log.evaluated_rules.map((r, i) => (
                  <li key={i} className="rule-item">
                    {r.rule} → {r.result ? "TRUE" : "FALSE"}
                  </li>
                ))
              ) : (
                <li>No rules evaluated</li>
              )}
            </ul>

          </div>
        ))}

      </div>
    </div>
  );
};

export default ExecutionPage;