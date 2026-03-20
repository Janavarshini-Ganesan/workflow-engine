import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import WorkflowList from "./pages/WorkflowList";
import WorkflowEditor from "./pages/WorkflowEditor";
import StepEditor from "./pages/StepEditor";
import RuleEditor from "./pages/RuleEditor";
import ExecutionPage from "./pages/ExecutionPage";
import AuditLogs from "./pages/AuditLogs";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WorkflowList />} />
          <Route path="/create" element={<WorkflowEditor />} />
          <Route path="/workflow/:id/steps" element={<StepEditor />} />
          <Route path="/step/:id/rules" element={<RuleEditor />} />
          <Route path="/workflow/:id/execute" element={<ExecutionPage />} />
          <Route path="/logs" element={<AuditLogs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;