const Order = require("../models/order");
const User = require("../models/User");
const Food = require("../models/food");
const Table = require("../models/table");
const mongoose = require("mongoose");

const creatOrder = async (req, res) => {
  try {
    const { userId, foods, totalPrice } = req.body;
    const tableId = req.query.tableId;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const table = await Table.findOne({ tableId });
    if (!table) {
      return res.status(400).json({ message: "Invalid table ID" });
    }

    const ValidFoods = await Promise.all(
      foods.map(async (names) => {
        const food = await Food.findOne({ name: names });
        return food ? food._id : false;
      })
    );

    const validFoodIds = ValidFoods.filter((id) => id !== null);

    const order = new Order({
      user: user._id,
      foods: validFoodIds,
      totalPrice,
      table: table._id,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("foods");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { creatOrder, updateOrder, getOrders };
