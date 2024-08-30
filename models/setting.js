const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  payWithPointsEnabled: { type: Boolean, default: true },
  pointMultiplier: { type: Number, default: 1 },
});

const settings = mongoose.model("settings", settingSchema);

module.exports = settings;
