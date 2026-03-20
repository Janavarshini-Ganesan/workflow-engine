import mongoose from "mongoose";

const executionSchema = new mongoose.Schema(
  {
    workflow_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true
    },

    workflow_version: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "failed", "canceled"],
      default: "pending"
    },

    data: {
      type: Object,
      required: true
    },

    current_step_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Step",
      default: null
    },

    retries: {
      type: Number,
      default: 0
    },

    triggered_by: {
      type: String,
      default: "system"
    },

    logs: {
      type: Array,
      default: []
    },

    started_at: {
      type: Date,
      default: Date.now
    },

    ended_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Execution = mongoose.model("Execution", executionSchema);

export default Execution;