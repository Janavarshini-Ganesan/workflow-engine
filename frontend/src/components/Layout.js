import { NavLink } from "react-router-dom";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>⚙️ Workflow</h2>

        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/create">
          Create Workflow
        </NavLink>

        <NavLink to="/logs">
          Audit Logs
        </NavLink>
      </div>

      {/* Main */}
      <div className="main">

        {/* Navbar */}
        <div className="navbar">
          <h3>Workflow Automation System</h3>
        </div>

        <div className="content">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Layout;