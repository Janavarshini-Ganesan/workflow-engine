import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./StepEditor.css";

const StepEditor = () => {

  const { id } = useParams(); // workflow id

  const [steps, setSteps] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("task");

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    try {
      const res = await API.get(`/workflows/${id}/steps`);
      setSteps(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addStep = async () => {
    try {
      await API.post(`/workflows/${id}/steps`, {
        name,
        step_type: type,
        order: steps.length + 1,
        metadata: {}
      });

      setName("");
      fetchSteps();

    } catch (error) {
      console.error(error);
      alert("Error adding step");
    }
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

                    <button
                    className="rule-btn"
                    onClick={() => window.location.href = `/step/${step._id}/rules`}
                    >
                    Add Rules
                    </button>

                </li>
                ))}
            </ul>

            </div>
        </div>
    );
};

export default StepEditor;