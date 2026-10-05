# 🚀 HireNest

### AI-Assisted Recruitment & Candidate Management Platform

> **Hire smarter. Screen faster. Build better teams.**

HireNest is a full-stack recruitment platform designed to bring the complete hiring workflow into one modern application.

From **creating job openings and managing candidates** to **tracking applications and AI-assisted candidate screening**, HireNest helps recruiters organize the hiring process while giving candidates a simple way to discover jobs and track their applications.

---

## 🌐 Live Demo

| Platform | Link |
|---|---|
| 🌐 **Frontend** | https://hire-nest-ivory.vercel.app |
| ⚙️ **Backend API** | https://hirenest-backend-ihvo.onrender.com |
| 💻 **GitHub** | https://github.com/mohini-2004/HireNest- |

---

# 💡 Why HireNest?

Traditional recruitment workflows often involve multiple disconnected tools for:

- Job postings
- Candidate management
- Application tracking
- Screening
- Interview stages
- Hiring decisions

**HireNest brings these workflows together in a single platform.**

The platform provides dedicated experiences for both **Recruiters** and **Candidates**, creating a structured hiring journey from application to final selection.

---

# ✨ Key Features

## 👨‍💼 Recruiter Experience

Recruiters can manage the hiring workflow from a centralized dashboard.

### 💼 Job Management
- Create job openings
- Define required skills
- View available jobs
- View detailed job information
- Manage job-specific candidates

### 👥 Candidate Management
- Add candidates to specific jobs
- View candidate profiles
- Manage candidate skills
- Track recruitment status
- Review candidate information

### 🤖 AI-Assisted Screening
- Compare candidate skills with job requirements
- Calculate candidate match percentage
- Identify matched skills
- Identify missing skills
- Generate candidate recommendations
- Move candidates through the recruitment pipeline

### 📊 Recruitment Dashboard
- View recruitment statistics
- Track candidate pipeline
- Monitor application activity
- Get an overview of hiring progress

---

# 👩‍💻 Candidate Experience

Candidates get their own dedicated recruitment workflow.

### 🔐 Account Management
- Candidate registration
- Secure login
- Role-based application flow

### 🔎 Job Discovery
- Browse available jobs
- View complete job descriptions
- Review required skills
- Explore suitable opportunities

### 📩 Applications
- Apply for jobs
- Prevent duplicate applications
- View submitted applications
- Track application status
- Monitor recruitment progress

---

# 🤖 AI-Assisted Candidate Screening

One of HireNest's core features is its **AI-assisted candidate screening system**.

Instead of manually comparing every candidate with a job description, recruiters can screen candidates based on their skills.

### Screening Workflow

```text
Candidate Skills
       │
       ▼
Job Requirements
       │
       ▼
   Skill Matching
       │
       ▼
    Match Score
       │
   ┌───┴────┐
   ▼        ▼
Matched   Missing
Skills     Skills
   │        │
   └───┬────┘
       ▼
Candidate Recommendation

The screening system compares the candidate's skills with the skills required for the selected job and generates a match score based on skill overlap.

📊 Screening Results
Match Score	Recommendation
80%+	🟢 Strong Match
60–79%	🔵 Good Match
40–59%	🟡 Needs Review
Below 40%	🔴 Low Match

This allows recruiters to quickly identify candidates who are more closely aligned with the requirements of a job.

🔄 Recruitment Pipeline

HireNest provides a structured candidate journey:

Applied
   ↓
AI Screened
   ↓
Shortlisted
   ↓
Interview
   ↓
Selected

Candidates can also be moved to:

Rejected

This gives recruiters a clear view of where every candidate currently stands in the hiring process.

🧩 Platform Modules
🔐 Authentication
Recruiter & Candidate registration
Login system
JWT authentication
Password hashing using bcrypt
Role-based application workflow
💼 Job Management
Create jobs
View jobs
View detailed job information
Job-specific skill requirements
👥 Candidate Management
Add candidates
Candidate profiles
Candidate skill management
Recruitment status tracking
📋 Application Management
Apply for jobs
Duplicate application prevention
Application tracking
Application status updates
Candidate application history
🤖 AI Screening
Candidate vs. job skill matching
Match percentage
Matched skills
Missing skills
Candidate recommendation
📊 Dashboards
Recruiter dashboard
Candidate dashboard
Recruitment statistics
Application statistics
Hiring pipeline visibility
🏗️ System Architecture
                    ┌──────────────────────┐
                    │       HireNest       │
                    │    React Frontend    │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   Authentication       Job Management      Candidate &
                                             Application
                                             Management
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     MongoDB Atlas     │
                    └──────────────────────┘
🛠️ Tech Stack
Frontend
⚛️ React.js
⚡ Vite
🧭 React Router
📜 JavaScript
🎨 CSS3
Backend
🟢 Node.js
🚂 Express.js
🔗 REST APIs
🔐 JWT Authentication
🔒 bcrypt
🌐 CORS
Database
🍃 MongoDB
☁️ MongoDB Atlas
🦫 Mongoose
AI / Screening
🤖 AI-assisted candidate screening
🎯 Skill matching
📊 Candidate scoring
🧠 Candidate recommendations
Deployment
▲ Vercel — Frontend
🚀 Render — Backend
☁️ MongoDB Atlas — Database
🔌 REST API
Authentication
POST /api/auth/signup
POST /api/auth/login
Jobs
GET  /api/jobs
POST /api/jobs
GET  /api/jobs/:id
Candidates
POST  /api/candidates
GET   /api/candidates/job/:jobId
GET   /api/candidates/:id
PATCH /api/candidates/:id/status
AI Screening
POST /api/candidates/:id/ai-screen
Applications
POST  /api/applications
GET   /api/applications/candidate/:candidateId
GET   /api/applications/recruiter/:recruiterId
GET   /api/applications/:id
PATCH /api/applications/:id/status
🔒 Security

HireNest follows standard backend security practices including:

JWT-based authentication
Password hashing using bcrypt
Role-based application workflows
Environment variables for sensitive configuration
MongoDB Atlas database security
Sensitive credentials excluded from the repository
📁 Project Structure
HireNest/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── RecruiterDashboard.jsx
│   │   │   ├── CandidateDashboard.jsx
│   │   │   ├── CreateJob.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── Candidate.jsx
│   │   │   ├── CandidateDetails.jsx
│   │   │   ├── AddCandidate.jsx
│   │   │   └── CandidateApplications.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
⚙️ Getting Started
1. Clone the Repository
git clone https://github.com/mohini-2004/HireNest-.git
cd HireNest-
2. Backend Setup
cd backend
npm install

Create a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Start the backend:

node server.js

The backend will run on:

http://localhost:5000
3. Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev

Vite will provide the local development URL in the terminal.

🚀 Future Enhancements

HireNest can be further extended with:

📄 Resume PDF upload & parsing
🧠 Advanced AI resume analysis
💬 AI-generated interview questions
✍️ AI-generated cover letters
📅 Interview scheduling
📧 Email notifications
📈 Advanced recruiter analytics
🎯 Intelligent job recommendations
🔍 Semantic resume-to-job matching
👑 Admin dashboard
📊 Advanced hiring analytics
🔔 Real-time recruitment notifications
🎯 Project Objective

The goal of HireNest is to make recruitment:

Faster. Smarter. More organized.

Instead of managing jobs, candidates, applications, and screening through disconnected systems, HireNest provides a centralized platform where recruiters can manage the complete hiring workflow.

At the same time, candidates get a simple experience to discover opportunities, apply for jobs, and track their recruitment journey.

In short:
HireNest
   │
   ├── Recruitment Management
   ├── Candidate Management
   ├── Application Tracking
   ├── Recruitment Pipeline
   └── AI-Assisted Screening
⭐ Project Highlights
✅ Full-Stack Web Application
✅ React + Node.js + Express
✅ MongoDB Atlas Integration
✅ REST API Architecture
✅ JWT Authentication
✅ Password Hashing with bcrypt
✅ Recruiter & Candidate Roles
✅ Job Management
✅ Candidate Management
✅ Application Tracking
✅ Recruitment Pipeline
✅ AI-Assisted Candidate Screening
✅ Match Score & Skill Analysis
✅ Responsive Modern UI
✅ Live Frontend Deployment
✅ Live Backend Deployment
👩‍💻 Author
Mohini Gupta

B.Tech — Computer Science & Engineering

🔗 GitHub:
https://github.com/mohini-2004
