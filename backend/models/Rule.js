import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema(
  {
    step_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Step",
      required: true
    },

    condition: {
      type: String,
      required: true
    },

    next_step_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Step",
      default: null
    },

    priority: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Rule = mongoose.model("Rule", ruleSchema);

export default Rule;