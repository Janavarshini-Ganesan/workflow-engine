import { useEffect, useState, useCallback  } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./StepEditor.css";

const StepEditor = () => {

  const { id } = useParams(); // workflow id

  const [steps, setSteps] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("task");
  const [editingId, setEditingId] = useState(null);


const fetchSteps = useCallback(async () => {
  try {
    const res = await API.get(`/workflows/${id}/steps`);
    setSteps(res.data);
  } catch (err) {
    console.error(err);
  }
}, [id]);


useEffect(() => {
  fetchSteps();
}, [fetchSteps]);

const addStep = async () => {
  try {

    if (editingId) {
      // UPDATE
      await API.put(`/steps/${editingId}`, {
        name,
        step_type: type
      });
    } else {
      // CREATE
      await API.post(`/workflows/${id}/steps`, {
        name,
        step_type: type,
        order: steps.length + 1,
        metadata: {}
      });
    }

    setName("");
    setType("task");
    setEditingId(null);

    fetchSteps();

  } catch (error) {
    console.error(error);
    alert("Error saving step");
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this step?");

  if (!confirmDelete) return;

  try {
    await API.delete(`/steps/${id}`);
    fetchSteps();
  } catch (error) {
    console.error(error);
    alert("Failed to delete step");
  }
};

const handleEdit = (step) => {
  setName(step.name);
  setType(step.step_type);
  setEditingId(step._id);
};

    return (
        <div className="container">
            <div className="card">

            <h2>Step Editor</h2>

            <h3>Add Step</h3>

            <input
                placeholder="Step Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="task">Task</option>
                <option value="approval">Approval</option>
                <option value="notification">Notification</option>
            </select>

            <button onClick={addStep}>Add Step</button>

            <h3>Steps List</h3>

            <ul className="step-list">
                {steps.map((step) => (
                <li key={step._id} className="step-item">

                    <span className="step-info">
                    {step.name} ({step.step_type})
                    </span>

                    <div className="step-actions">
                    <button
                    className="rule-btn"
                    onClick={() => 
                      window.location.href = `/step/${step._id}/rules?workflowId=${id}`
                    }
                    >
                    Add Rules
                    </button>

                    {/* EDIT */}
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(step)}
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(step._id)}
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

export default StepEditor;