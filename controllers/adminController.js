const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  calculateDailySales,
  calculateMonthlySales,
} = require("../services/salesService");
const Order = require("../models/order");

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

const getDailySales = async (res, req) => {
  try {
    const date = req.params.date;
    const sales = await calculateDailySales(date);
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily sales", error });
  }
};

const getMonthlySales = async (req, res) => {
  try {
    const { year, month } = req.params;
    const sales = await calculateMonthlySales(month, year);
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly sales", error });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const orders = await Order.find({ status: "completed" }).populate(
      "foods",
      "name price"
    );

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    const detailedOrders = orders.map((order) => ({
      orderId: order._id,
      foods: order.foods.map((food) => ({
        name: food.name,
        price: food.price,
      })),
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
    }));
    res.status(200).json(detailedOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order details", error });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getDailySales,
  getMonthlySales,
  getOrderDetails,
};
