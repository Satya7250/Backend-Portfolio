const User = require("../models/user");

const handleCreateUser = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const user = await User.create({ name, email, message });

    res.status(201).json(user);
  } catch (err) {

    // Mongoose validation error
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }

    // Duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { handleCreateUser };
