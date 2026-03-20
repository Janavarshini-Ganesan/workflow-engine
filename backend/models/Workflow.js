import mongoose from "mongoose";

const workflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    version: {
      type: Number,
      default: 1
    },

    is_active: {
      type: Boolean,
      default: true
    },

    input_schema: {
      type: Object,
      required: true
    },

    start_step_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Step",
      default: null
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Workflow = mongoose.model("Workflow", workflowSchema);

export default Workflow;