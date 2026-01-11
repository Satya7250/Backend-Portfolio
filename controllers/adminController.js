const User = require("../models/user");

// Render admin page with all users
const renderAdminPanel = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render("admin", { users });
  } catch (error) {
    res.status(500).send("Failed to load admin panel");
  }
};

// Delete user
const handleDeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Failed to delete user");
  }
};

module.exports = { renderAdminPanel, handleDeleteUser };
