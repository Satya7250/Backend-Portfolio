const User = require("../models/user");
const View = require("../models/view");

// Render admin page with all users and visit count
const renderAdminPanel = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    // Get total visit count
    let viewRecord = await View.findOne();
    const totalViews = viewRecord ? viewRecord.totalViews : 0;

    res.render("admin", { users, totalViews });
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
