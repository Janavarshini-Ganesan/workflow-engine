import mongoose from "mongoose";

const stepSchema = new mongoose.Schema(
  {
    workflow_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    step_type: {
      type: String,
      enum: ["task", "approval", "notification"],
      required: true
    },

    order: {
      type: Number,
      required: true
    },

    metadata: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Step = mongoose.model("Step", stepSchema);

export default Step;