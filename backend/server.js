const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const Job = require("./models/Job");
const Candidate = require("./models/Candidate");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==================== TEST ROUTE ====================

app.get("/", (req, res) => {
  res.json({
    message: "HireNest Backend is running 🚀",
  });
});

// ==================== SIGNUP ====================

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!["candidate", "recruiter"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==================== LOGIN ====================

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (user.role !== role) {
      return res.status(401).json({
        message: "Incorrect account type selected",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// =====================================================
// ==================== JOBS ============================
// =====================================================

// ==================== CREATE JOB ====================

app.post("/api/jobs", async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      jobType,
      experience,
      salary,
      skills,
      description,
      recruiter,
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      !jobType ||
      !experience ||
      !skills ||
      !description ||
      !recruiter
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(recruiter)) {
      return res.status(400).json({
        message: "Invalid recruiter ID",
      });
    }

    const recruiterUser = await User.findById(recruiter);

    if (!recruiterUser) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    if (recruiterUser.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can create jobs",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      experience,
      salary,
      skills,
      description,
      recruiter,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error.message);

    res.status(500).json({
      message: "Server error while creating job",
    });
  }
});

// ==================== GET ALL JOBS ====================

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error.message);

    res.status(500).json({
      message: "Server error while fetching jobs",
    });
  }
});

// ==================== GET JOBS BY RECRUITER ====================

app.get("/api/jobs/recruiter/:recruiterId", async (req, res) => {
  try {
    const { recruiterId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
      return res.status(400).json({
        message: "Invalid recruiter ID",
      });
    }

    const jobs = await Job.find({
      recruiter: recruiterId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error("Recruiter jobs error:", error.message);

    res.status(500).json({
      message: "Server error while fetching recruiter jobs",
    });
  }
});

// ==================== GET SINGLE JOB ====================

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(id).populate(
      "recruiter",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      job,
    });
  } catch (error) {
    console.error("Get single job error:", error.message);

    res.status(500).json({
      message: "Server error while fetching job",
    });
  }
});

// =====================================================
// ==================== CANDIDATES ======================
// =====================================================

// ==================== CREATE CANDIDATE ====================

app.post("/api/candidates", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      resume,
      skills,
      experience,
      job,
      recruiter,
    } = req.body;

    if (!name || !email || !job || !recruiter) {
      return res.status(400).json({
        message: "Name, email, job and recruiter are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(job)) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(recruiter)) {
      return res.status(400).json({
        message: "Invalid recruiter ID",
      });
    }

    const jobExists = await Job.findById(job);

    if (!jobExists) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const recruiterExists = await User.findById(recruiter);

    if (!recruiterExists) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    if (recruiterExists.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can add candidates",
      });
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      resume,
      skills: skills || [],
      experience,
      job,
      recruiter,
    });

    res.status(201).json({
      message: "Candidate added successfully",
      candidate,
    });
  } catch (error) {
    console.error("Create candidate error:", error.message);

    res.status(500).json({
      message: "Server error while adding candidate",
    });
  }
});

// ==================== GET CANDIDATES BY RECRUITER ====================

app.get(
  "/api/candidates/recruiter/:recruiterId",
  async (req, res) => {
    try {
      const { recruiterId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
        return res.status(400).json({
          message: "Invalid recruiter ID",
        });
      }

      const candidates = await Candidate.find({
        recruiter: recruiterId,
      })
        .populate("job", "title company")
        .sort({ createdAt: -1 });

      res.status(200).json({
        candidates,
      });
    } catch (error) {
      console.error("Get candidates error:", error.message);

      res.status(500).json({
        message: "Server error while fetching candidates",
      });
    }
  }
);

// ==================== GET SINGLE CANDIDATE ====================

app.get("/api/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid candidate ID",
      });
    }

    const candidate = await Candidate.findById(id)
      .populate("job", "title company location skills")
      .populate("recruiter", "name email");

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      candidate,
    });
  } catch (error) {
    console.error("Get single candidate error:", error.message);

    res.status(500).json({
      message: "Server error while fetching candidate",
    });
  }
});

// ==================== UPDATE CANDIDATE STATUS ====================

app.patch("/api/candidates/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "AI Screened",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid candidate ID",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid candidate status",
      });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("job", "title company location skills")
      .populate("recruiter", "name email");

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      message: "Candidate status updated successfully",
      candidate,
    });
  } catch (error) {
    console.error(
      "Update candidate status error:",
      error.message
    );

    res.status(500).json({
      message: "Server error while updating candidate status",
    });
  }
});

// ==================== AI RESUME SCREENING ====================

app.post("/api/candidates/:id/ai-screen", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid candidate ID",
      });
    }

    const candidate = await Candidate.findById(id).populate("job");

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    if (!candidate.job) {
      return res.status(404).json({
        message: "Job information not found",
      });
    }

    const candidateSkills = (candidate.skills || [])
      .map((skill) => skill.toLowerCase().trim())
      .filter(Boolean);

    const jobSkills = (candidate.job.skills || [])
      .map((skill) => skill.toLowerCase().trim())
      .filter(Boolean);

    const matchedSkills = candidateSkills.filter((skill) =>
      jobSkills.includes(skill)
    );

    const missingSkills = jobSkills.filter(
      (skill) => !candidateSkills.includes(skill)
    );

    const score =
      jobSkills.length > 0
        ? Math.round(
            (matchedSkills.length / jobSkills.length) * 100
          )
        : 0;

    let recommendation = "Needs Review";

    if (score >= 80) {
      recommendation = "Strong Match";
    } else if (score >= 60) {
      recommendation = "Good Match";
    } else if (score < 40) {
      recommendation = "Low Match";
    }

    const updatedCandidate =
      await Candidate.findByIdAndUpdate(
        id,
        {
          status: "AI Screened",
          aiScore: score,
          matchedSkills,
          missingSkills,
          aiRecommendation: recommendation,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("job", "title company location skills")
        .populate("recruiter", "name email");

    res.status(200).json({
      message: "AI screening completed successfully",
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error("AI screening error:", error.message);

    res.status(500).json({
      message: "Server error while screening candidate",
    });
  }
});

// =====================================================
// ==================== APPLICATIONS ====================
// =====================================================

// Application schema
const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "AI Screened",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
      ],
      default: "Applied",
    },

    coverLetter: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications
applicationSchema.index(
  {
    candidate: 1,
    job: 1,
  },
  {
    unique: true,
  }
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

// ==================== APPLY FOR JOB ====================

app.post("/api/applications", async (req, res) => {
  try {
    const {
      candidate,
      job,
      coverLetter,
    } = req.body;

    if (!candidate || !job) {
      return res.status(400).json({
        message: "Candidate and job are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(candidate)) {
      return res.status(400).json({
        message: "Invalid candidate ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(job)) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    const candidateUser = await User.findById(candidate);

    if (!candidateUser) {
      return res.status(404).json({
        message: "Candidate account not found",
      });
    }

    if (candidateUser.role !== "candidate") {
      return res.status(403).json({
        message: "Only candidates can apply for jobs",
      });
    }

    const jobExists = await Job.findById(job);

    if (!jobExists) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const existingApplication = await Application.findOne({
      candidate,
      job,
    });

    if (existingApplication) {
      return res.status(409).json({
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      candidate,
      job,
      recruiter: jobExists.recruiter,
      coverLetter: coverLetter || "",
    });

    const populatedApplication =
      await Application.findById(application._id)
        .populate("candidate", "name email")
        .populate(
          "job",
          "title company location jobType experience salary skills"
        )
        .populate("recruiter", "name email");

    res.status(201).json({
      message: "Application submitted successfully 🎉",
      application: populatedApplication,
    });
  } catch (error) {
    console.error("Apply job error:", error.message);

    // Duplicate key protection
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already applied for this job",
      });
    }

    res.status(500).json({
      message: "Server error while applying for job",
    });
  }
});

// ==================== GET APPLICATIONS BY CANDIDATE ====================

app.get(
  "/api/applications/candidate/:candidateId",
  async (req, res) => {
    try {
      const { candidateId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        return res.status(400).json({
          message: "Invalid candidate ID",
        });
      }

      const applications = await Application.find({
        candidate: candidateId,
      })
        .populate(
          "job",
          "title company location jobType experience salary skills"
        )
        .populate("recruiter", "name email")
        .sort({ createdAt: -1 });

      res.status(200).json({
        applications,
      });
    } catch (error) {
      console.error(
        "Get candidate applications error:",
        error.message
      );

      res.status(500).json({
        message: "Server error while fetching applications",
      });
    }
  }
);

// ==================== GET APPLICATIONS BY RECRUITER ====================

app.get(
  "/api/applications/recruiter/:recruiterId",
  async (req, res) => {
    try {
      const { recruiterId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
        return res.status(400).json({
          message: "Invalid recruiter ID",
        });
      }

      const applications = await Application.find({
        recruiter: recruiterId,
      })
        .populate("candidate", "name email")
        .populate(
          "job",
          "title company location jobType experience"
        )
        .sort({ createdAt: -1 });

      res.status(200).json({
        applications,
      });
    } catch (error) {
      console.error(
        "Get recruiter applications error:",
        error.message
      );

      res.status(500).json({
        message: "Server error while fetching applications",
      });
    }
  }
);

// ==================== GET SINGLE APPLICATION ====================

app.get("/api/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    const application = await Application.findById(id)
      .populate("candidate", "name email")
      .populate(
        "job",
        "title company location jobType experience salary skills description"
      )
      .populate("recruiter", "name email");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      application,
    });
  } catch (error) {
    console.error(
      "Get application error:",
      error.message
    );

    res.status(500).json({
      message: "Server error while fetching application",
    });
  }
});

// ==================== UPDATE APPLICATION STATUS ====================

app.patch("/api/applications/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "AI Screened",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status",
      });
    }

    const application =
      await Application.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("candidate", "name email")
        .populate(
          "job",
          "title company location jobType experience"
        )
        .populate("recruiter", "name email");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error(
      "Update application status error:",
      error.message
    );

    res.status(500).json({
      message: "Server error while updating application status",
    });
  }
});

// =====================================================
// ==================== MONGODB =========================
// =====================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");

    app.listen(PORT, () => {
      console.log(
        `HireNest server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);
  });