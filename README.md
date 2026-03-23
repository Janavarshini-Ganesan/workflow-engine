#  Workflow Engine System

A full-stack Workflow Engine that allows users to design workflows, define rules, execute processes, and track execution logs dynamically.

---

##  Overview

This project enables automation of business processes using configurable workflows.
Users can create workflows, add steps, define rules, and execute workflows with real-time decision-making.

---

##  Features

###  Workflow Management

* Create, update, delete workflows
* Version control for workflows
* Define input schema dynamically

###  Step Management

* Add, edit, delete steps
* Step types:

  * Task
  * Approval
  * Notification

###  Rule Engine

* Define conditional rules
* Priority-based rule execution
* DEFAULT rule support
* Dynamic next-step selection

###  Workflow Execution

* Execute workflows with input data
* Real-time step progression
* Rule evaluation engine
* Automatic step transitions

###  Execution Logs

* Step-by-step execution tracking
* Rule evaluation results
* Status updates
* Next step decisions

###  Cascade Delete (Important Feature)

* Deleting workflow removes:

  * Steps
  * Rules
  * Executions (if enabled)

---

##  Tech Stack

### Frontend

* React.js
* CSS (Custom Styling)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

##  Project Structure

```
workflow-engine/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/pages/
│   ├── src/services/
│   └── public/
│
└── README.md
```

---

##  Installation & Setup

###  Clone the repository

```
git clone https://github.com/Janavarshini-Ganesan/workflow-engine.git
cd workflow-engine
```

---

###  Backend Setup

```
cd backend
npm install
npm start
```

---

###  Frontend Setup

```
cd frontend
npm install
npm start
```

---

##  How to Use

1. Create a Workflow
2. Add Steps (Task / Approval / Notification)
3. Define Rules with conditions
4. Execute workflow with input data
5. View execution logs

---

##  Example Workflow

**Expense Approval**

Input:

* amount: 250
* country: US
* priority: High

Flow:

```
Manager Approval → Finance Notification → END
```

---

##  Key Highlights

* Dynamic Rule Evaluation Engine
* Priority-based execution
* Clean UI with action controls
* Cascade delete handling
* Modular backend architecture

---

##  UI Preview

* Workflow Dashboard
* Step Editor
* Rule Editor
* Execution Logs

---

##  Deployment

* **Frontend:** Netlify
  https://janavarshini-workflowengine.netlify.app/
* **Backend:** Render
  https://workflow-backend-bblv.onrender.com/

---

##  Author

**Janavarshini Ganesan**

---

##  Future Enhancements

* Drag & Drop workflow builder
* Looping & branching support
* Role-based approvals
* Notification integrations (Email/Slack)
* Advanced analytics dashboard

---

##  Conclusion

This project demonstrates a complete workflow automation system with dynamic decision-making and execution tracking, suitable for real-world business process automation.

---
