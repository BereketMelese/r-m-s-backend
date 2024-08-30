const Settings = require("../models/setting");

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.status(201).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  const { payWithPointsEnabled, pointMultiplier } = req.body;
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      { payWithPointsEnabled, pointMultiplier },
      { new: true, upsert: true }
    );
    res.status(201).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSettings, updateSettings };
