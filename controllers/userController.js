const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

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
      points: 5,
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
      points: user.points,
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

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      res.status(400).json({ error: err.message });
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
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);

    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const submitRating = async (req, res) => {
  try {
    const { userId, rating } = req.body;

    const user = await User.findById(userId);

    if (user && !user.hasRated) {
      user.hasRated = true;
      user.rating = rating;

      res.status(200).json({ message: "Rating submitted successfully" });
    } else {
      res.status(400).json({ message: "User has already rated" });
    }
    await user.save();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUsers, submitRating };
