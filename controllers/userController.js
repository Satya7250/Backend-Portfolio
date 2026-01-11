const User = require("../models/user");

const handleCreateUser = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: "Missing required fields",
        required: ["name", "email", "message"]
      });
    }

    const user = await User.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        message: user.message,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error("Error creating user:", err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        error: "Validation failed",
        details: errors
      });
    }

    // Duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ 
        error: "Email already exists",
        message: "This email has already been used. Please use a different email."
      });
    }

    // Generic error
    res.status(500).json({ 
      error: "Server error",
      message: err.message || "An unexpected error occurred"
    });
  }
};

module.exports = { handleCreateUser };
