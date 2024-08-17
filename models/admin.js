const mongoose = require("mongoose");
const User = require("./User");

const adminSchema = new mongoose.Schema({
  canAddCategory: { type: Boolean, default: true },
  canAddFood: { type: Boolean, default: true },
  canViewOrders: { type: Boolean, default: true },
});

const Admin = User.discriminator("Admin", adminSchema);

module.exports = Admin;
