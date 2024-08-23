const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email,
      role: "user",
    });
    await user.save();

    let token;
    try {
      token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    res.status(201).json({
      userId: user._id,
      email: user.email,
      token: token,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    if (!existingUser) {
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
    if (!isValidPassword) {
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      userId: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
      token: token,
    });
  } catch (error) {}
};

module.exports = { registerUser, loginUser };
