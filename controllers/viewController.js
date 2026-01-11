const View = require("../models/view");

const handleIncrementView = async (req, res) => {
  try {
    let viewDoc = await View.findOne();

    if (!viewDoc) {
      viewDoc = await View.create({ totalViews: 1 });
    } else {
      viewDoc.totalViews += 1;
      await viewDoc.save();
    }

    res.status(200).json({ success: true });

  } catch {
    res.status(500).json({ success: false });
  }
};

module.exports = { handleIncrementView };
