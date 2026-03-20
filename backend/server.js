import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

// Routes
import workflowRoutes from "./routes/workflowRoutes.js";
import stepRoutes from "./routes/stepRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
import executionRoutes from "./routes/executionRoutes.js";

dotenv.config();

const app = express();

// DB connect
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Rule Engine API Running...");
});

// ✅ ROUTES (CLEAN STRUCTURE)

app.use("/workflows", workflowRoutes);
app.use("/", stepRoutes);
app.use("/", ruleRoutes);
app.use("/executions", executionRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});