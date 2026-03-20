import { useState } from "react";
import API from "../services/api";
import "./WorkflowEditor.css";

const WorkflowEditor = () => {

  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, { key: "", type: "string", required: false }]);
  };

  const removeField = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
  };

  const handleFieldChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const createWorkflow = async () => {
    try {
      if (!name) {
        alert("Workflow name is required");
        return;
      }

      const input_schema = {};

      for (let f of fields) {
        if (!f.key) {
          alert("Field name cannot be empty");
          return;
        }

        input_schema[f.key] = {
          type: f.type,
          required: f.required
        };
      }

      await API.post("/workflows", { name, input_schema });

      alert("Workflow Created Successfully!");
      setName("");
      setFields([]);

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Error creating workflow");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Create Workflow</h2>

        <input
          className="input"
          placeholder="Workflow Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h3>Input Schema</h3>

        {fields.map((field, index) => (
          <div key={index} className="field-row">

            <input
              placeholder="Field Name"
              value={field.key}
              onChange={(e) =>
                handleFieldChange(index, "key", e.target.value)
              }
            />

            <select
              value={field.type}
              onChange={(e) =>
                handleFieldChange(index, "type", e.target.value)
              }
            >
              <option value="string">string</option>
              <option value="number">number</option>
            </select>

            <label>
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) =>
                  handleFieldChange(index, "required", e.target.checked)
                }
              />
              Required
            </label>

            <button
              className="btn-danger"
              onClick={() => removeField(index)}
            >
              ✕
            </button>

          </div>
        ))}

        <div className="btn-group">
          <button className="btn-secondary" onClick={addField}>
            + Add Field
          </button>

          <button className="btn-primary" onClick={createWorkflow}>
            Create Workflow
          </button>
        </div>

      </div>
    </div>
  );
};

export default WorkflowEditor;