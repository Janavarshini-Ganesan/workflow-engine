import { useEffect, useState } from "react";
import API from "../services/api";
import "./AuditLogs.css";

const AuditLogs = () => {

  const [executions, setExecutions] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);

  useEffect(() => {
    fetchExecutions();
  }, []);

  const fetchExecutions = async () => {
    try {
      const res = await API.get("/executions");
      console.log("Executions:", res.data);
      setExecutions(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching executions");
    }
  };

  const viewLogs = (logs) => {
    if (!logs || logs.length === 0) {
      alert("No logs available ❌");
      return;
    }
    setSelectedLogs(logs);
  };

  return (
    <div className="audit-container">
      <div className="audit-card">

        <h2>Audit Logs</h2>

        <table className="audit-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Workflow</th>
              <th>Status</th>
              <th>Started</th>
              <th>Ended</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {executions.map((exe) => (
              <tr key={exe._id}>
                <td>{exe._id}</td>
                <td>{exe.workflow_id}</td>

                <td className={
                  exe.status === "completed"
                    ? "status-completed"
                    : "status-failed"
                }>
                  {exe.status}
                </td>

                <td>{new Date(exe.started_at).toLocaleString()}</td>

                <td>
                  {exe.ended_at
                    ? new Date(exe.ended_at).toLocaleString()
                    : "Running"}
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => viewLogs(exe.logs)}
                  >
                    View Logs
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="logs-container">
          <h3>Execution Details</h3>

          {selectedLogs.length === 0 && (
            <p>No logs selected</p>
          )}

          {selectedLogs.map((log, i) => (
            <div key={i} className="log-card">
              <p><b>Step:</b> {log.step_name}</p>
              <p><b>Status:</b> {log.status}</p>
              <p><b>Next:</b> {log.selected_next_step || "END"}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AuditLogs;