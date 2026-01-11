const mongoose = require("mongoose");

/* ------------------ DB CONNECTION ------------------ */
async function connectToMongoDb(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}


module.exports = {
    connectToMongoDb,
}