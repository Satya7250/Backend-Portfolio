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

// Reset visit count
const handleResetVisitCount = async (req, res) => {
  try {
    console.log('Reset visit count called');
    let viewRecord = await View.findOne();

    if (viewRecord) {
      viewRecord.totalViews = 0;
      await viewRecord.save();
      console.log('Visit count reset to 0');
    } else {
      await View.create({ totalViews: 0 });
      console.log('New view record created with 0 visits');
    }

    res.redirect("/admin");
  } catch (error) {
    console.error('Error resetting visit count:', error);
    res.status(500).send("Failed to reset visit count");
  }
};

module.exports = { renderAdminPanel, handleDeleteUser, handleResetVisitCount };
