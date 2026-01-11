const mongoose = require("mongoose");

/* ------------------ DB CONNECTION ------------------ */
async function connectToMongoDb(uri) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // process.exit(1); // Avoid exiting the process in serverless environment
  }
}


module.exports = {
    connectToMongoDb,
}