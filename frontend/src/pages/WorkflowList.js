import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./WorkflowList.css";

const WorkflowList = () => {

  const [workflows, setWorkflows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const res = await API.get("/workflows");
      setWorkflows(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this workflow?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/workflows/${id}`);

      // refresh list after delete
      fetchWorkflows();

    } catch (error) {
      console.error(error);
      alert("Failed to delete workflow");
    }
  };

  return (
    <div className="container">
    <div className="card">

      <h2>Workflows</h2>

      <div className="button-group">
        <button
          className="btn-primary"
          onClick={() => navigate("/create")}
        >
          + Create Workflow
        </button>

        <button
          className="btn-success"
          onClick={() => navigate("/logs")}
        >
          View Audit Logs
        </button>
      </div>

      {workflows.length === 0 ? (
        <div className="empty">No workflows created yet</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {workflows.map((wf) => (
              <tr key={wf._id}>
                <td>{wf.name}</td>
                <td>{wf.version}</td>
                <td>
                  <span className={wf.is_active ? "status-active" : "status-inactive"}>
                    {wf.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="actions">
                  <button
                    className="btn-secondary"
                    onClick={() => navigate(`/workflow/${wf._id}/steps`)}
                  >
                    Steps
                  </button>

                  <button
                    className="btn-success"
                    onClick={() => navigate(`/workflow/${wf._id}/execute`)}
                  >
                    Execute
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(wf._id)}
                  >
                    Delete
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  </div>
);
};

export default WorkflowList;