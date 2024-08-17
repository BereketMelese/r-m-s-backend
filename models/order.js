const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foods: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, eNum: ["pending", "in_progress", "completed"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", orderSchema);
