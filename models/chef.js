const mongoose = require("mongoose");
const User = require("./User");

const chefSchema = new mongoose.Schema({
  canManageOrders: { type: Boolean, default: true },
  canViewOrders: { type: Boolean, default: true },
});

const Chef = User.discriminator("Chef", chefSchema);

module.exports = Chef;
