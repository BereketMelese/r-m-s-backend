const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foods: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, eNum: ["pending", "in_progress", "completed"] },
  createdAt: { type: Date, default: Date.now },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
});

module.exports = mongoose.model("order", orderSchema);
