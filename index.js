require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToMongoDb } = require("./connect");
const userRouter = require("./routes/user");
const viewRouter = require("./routes/view");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", "./views");

/* ------------------ DB CONNECTION ------------------ */
connectToMongoDb(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio-user");

/* ------------------ MIDDLEWARE ------------------ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ------------------ ROUTES ------------------ */
app.get("/", (req, res) => {
  res.render("index");
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


