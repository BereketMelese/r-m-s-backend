const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
  try {
    const { username, password, image, email, role } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) throw new Error("Admin already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username,
      password: hashedPassword,
      image,
      email,
      role,
      canAddCategory: true,
      canAddFood: true,
      canViewOrders: true,
      role: "admin",
    });
    await admin.save();

    // let token;
    // try {
    //   token = jwt.sign(
    //     {
    //       id: admin.id,
    //       email: admin.email,
    //     },
    //     process.env.JWT_SECRET,
    //     {
    //       expiresIn: "1h",
    //     }
    //   );
    // } catch (err) {
    //   res.status(400).json({ error: err.message });
    // }

    res.status(201).json({ message: "Admin registered" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let existingUser;
    try {
      existingUser = await Admin.findOne({ email: email });
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

module.exports = { registerAdmin, loginAdmin };
