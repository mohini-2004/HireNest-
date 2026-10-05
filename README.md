# 🚀 HireNest

### AI-Powered Recruitment & Candidate Management Platform

> Hire smarter. Screen faster. Build better teams.

HireNest is a full-stack recruitment platform designed to simplify the hiring journey for both recruiters and candidates.

The platform brings **job management, candidate screening, application tracking, recruitment pipelines, and AI-assisted candidate evaluation** together in one modern web application.

---

## 🌐 Live Demo

### 🔗 Frontend
https://hire-nest-g6fdqh2u6-mohinigupta-cs23-5986s-projects.vercel.app

### ⚙️ Backend API
https://hirenest-backend-ihvo.onrender.com

### 💻 Source Code
https://github.com/mohini-2004/HireNest-

---

## ✨ What HireNest Does

HireNest provides two dedicated experiences:

### 👨‍💼 For Recruiters

Recruiters can:

- Create and manage job openings
- Add candidates to specific jobs
- View detailed candidate profiles
- Manage the recruitment pipeline
- Track candidate applications
- Update application status
- Perform AI-assisted candidate screening
- Compare candidate skills with job requirements
- View AI match scores
- Identify matched and missing skills
- Get candidate recommendations

### 👩‍💻 For Candidates

Candidates can:

- Create an account and log in
- Browse available jobs
- View detailed job descriptions
- Apply for suitable positions
- Track submitted applications
- Monitor application status
- Follow their recruitment progress
- View shortlisted and interview stages

---

# 🤖 AI-Powered Candidate Screening

One of the core features of HireNest is its AI-assisted candidate screening system.

Recruiters can screen a candidate against the skills required for a particular job.

The system analyzes:

```text
Candidate Skills
       +
Job Requirements
       ↓
Skill Matching
       ↓
Match Score
       ↓
Matched Skills
       +
Missing Skills
       ↓
Candidate Recommendation


📊 Screening Results

The system can provide recommendations such as:

Match Score	Recommendation
80%+	🟢 Strong Match
60–79%	🔵 Good Match
40–59%	🟡 Needs Review
Below 40%	🔴 Low Match

This helps recruiters quickly identify candidates who are more closely aligned with a job's requirements.

🔄 Recruitment Pipeline

HireNest supports a structured candidate journey:

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

This provides recruiters with a clear view of the hiring pipeline.

🧩 Core Features
🔐 Authentication
Recruiter & Candidate registration
Login system
JWT authentication
Password hashing with bcrypt
Role-based application flow
💼 Job Management
Create jobs
View jobs
View detailed job information
Skill-based job requirements
👥 Candidate Management
Add candidates
Candidate profiles
Candidate skill management
Recruitment status tracking
📋 Application Management
Apply for jobs
Prevent duplicate applications
Track applications
Application status updates
Candidate application history
🤖 AI Screening
Candidate vs Job skill matching
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
🛠️ Tech Stack
Frontend
⚛️ React.js
⚡ Vite
🧭 React Router
🎨 CSS3
📜 JavaScript
Backend
🟢 Node.js
🚂 Express.js
🔗 REST APIs
🔐 JWT
🔒 bcrypt
🌐 CORS
Database
🍃 MongoDB
☁️ MongoDB Atlas
🦫 Mongoose
AI
🤖 AI-assisted candidate screening
🎯 Skill matching
📊 Candidate scoring
🧠 Candidate recommendation
Deployment
▲ Vercel — Frontend
🚀 Render — Backend
☁️ MongoDB Atlas — Database
🏗️ Architecture
                    ┌─────────────────────┐
                    │      HireNest       │
                    │   React Frontend    │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │    Node.js +        │
                    │     Express.js      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Authentication     Job Management   AI Screening
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    └─────────────────────┘
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

🔌 API Endpoints
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
Environment variables for sensitive configuration
MongoDB Atlas database security
Role-based application workflows

Sensitive credentials and environment variables are intentionally excluded from the repository.

🚀 Future Enhancements

The platform can be further extended with:

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
📊 Hiring analytics & reports
🎯 Project Objective

The goal of HireNest is to make recruitment faster, more organized, and more data-driven.

Instead of managing jobs, candidates, applications, and screening through disconnected systems, HireNest provides a centralized platform where recruiters can manage the complete hiring workflow while candidates can easily discover opportunities and track their applications.

In short:

HireNest = Recruitment Management + Candidate Tracking + AI-Assisted Screening

👩‍💻 Author
Mohini Gupta

B.Tech — Computer Science & Engineering

GitHub:
https://github.com/mohini-2004

⭐ Project Highlights
✓ Full-Stack Web Application
✓ React + Node.js + Express
✓ MongoDB Atlas Integration
✓ JWT Authentication
✓ Recruiter & Candidate Roles
✓ Job Management
✓ Candidate Management
✓ Application Tracking
✓ Recruitment Pipeline
✓ AI-Assisted Candidate Screening
✓ Live Deployment
✓ REST API Architecture


