const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, requried: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String },
  points: { type: Number },
  rating: { type: Number, min: 1, max: 5 },
  hasRated: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
