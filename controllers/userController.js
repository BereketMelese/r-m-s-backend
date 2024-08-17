const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, password, image, email, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      image,
      email,
      role,
    });
    await user.save();

    // let token;
    // try {
    //   token = jwt.sign(
    //     {
    //       id: user.id,
    //       email: user.email,
    //     },
    //     process.env.JWT_SECRET,
    //     {
    //       expiresIn: "1h",
    //     }
    //   );
    // } catch (err) {
    //   res.status(400).json({ error: err.message });
    // }

    res.status(201).json({ message: "User registered" });
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

    // const token = jwt.sign(
    //   { id: existingUser._id, email: existingUser.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    res.json({ username: existingUser.username, role: existingUser.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
