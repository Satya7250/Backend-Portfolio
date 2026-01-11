// Vercel serverless function entry point
// This file exports the Express app as a serverless function handler
const app = require("../index");

// Export as Vercel serverless function handler
// Vercel expects the handler to be the Express app directly
module.exports = app;
