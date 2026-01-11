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
app.set("views", path.join(__dirname, "views"));

/* ------------------ MIDDLEWARE ------------------ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use("/api/users", userRouter);
app.use("/api", viewRouter);
app.use("/admin", adminRouter);

/* ------------------ SERVER ------------------ */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;


