require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectToMongoDb } = require("./connect");
const userRouter = require("./routes/user");
const viewRouter = require("./routes/view");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

// Set views path using absolute path (required for Vercel serverless)
app.set("view engine", "ejs");
// Resolve views path - works in both local and Vercel serverless
// When api/index.js requires ../index.js, __dirname in index.js is the Backend-Portfolio root
const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);

// Debug logging (only in development)
if (process.env.NODE_ENV !== "production") {
  console.log("Views path set to:", viewsPath);
  console.log("__dirname:", __dirname);
}

/* ------------------ MIDDLEWARE ------------------ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

/* ------------------ DB CONNECTION MIDDLEWARE ------------------ */
// Ensure MongoDB connection on every request (critical for serverless)
app.use(async (req, res, next) => {
  try {
    await connectToMongoDb();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ 
      error: "Database connection failed",
      message: error.message || "Unable to connect to database"
    });
  }
});

/* ------------------ ROUTES ------------------ */
// Root route - return API status (better for serverless/API-only backend)
app.get("/", (req, res) => {
  res.json({
    message: "Backend Portfolio API",
    status: "operational",
    endpoints: {
      users: "POST /api/users",
      views: "POST /api/view",
      admin: "GET /admin"
    }
  });
});

// API routes - order matters! More specific routes first
app.use("/api/users", userRouter);
app.use("/api", viewRouter);
app.use("/admin", adminRouter);

// Debug route to test if routing is working
app.get("/api/test", (req, res) => {
  res.json({ message: "API routing is working!" });
});

/* ------------------ SERVER ------------------ */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;


