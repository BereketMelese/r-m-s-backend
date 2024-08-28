const Order = require("../models/order");
const User = require("../models/user");
const Food = require("../models/food");
const Table = require("../models/table");
const mongoose = require("mongoose");
const food = require("../models/food");

const creatOrder = async (req, res) => {
  try {
    const { userId, foods, totalPrice, usePoints } = req.body;
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

    let orderRequiredPoints = totalPrice;
    if (usePoints) {
      const requiredPoints = orderRequiredPoints * 6;
      if (user.points < requiredPoints) {
        return res.status(400).json({ message: "Not enough points" });
      }
      user.points -= requiredPoints;
      await user.save();
      orderRequiredPoints = 0;
    }

    const order = new Order({
      user: user._id,
      foods: validFoodIds,
      totalPrice,
      status: "pending",
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

    if (status === "completed" && order.status !== "completed") {
      const user = await User.findById(order.user);

      if (user) {
        let totalPoints = 0;

        const foodPromises = order.foods.map(async (foodId) => {
          const food = await Food.findById(foodId);
          return food.points;
        });

        const pointsArray = await Promise.all(foodPromises);

        for (let i = 0; i < pointsArray.length; i++) {
          if (!isNaN(pointsArray[i])) {
            totalPoints += pointsArray[i];
          }
        }

        user.points += totalPoints;
        order.status = status;
        await order.save();
        await user.save();

        res.json(order);
        return;
      }
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("foods")
      .populate("table");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { creatOrder, updateOrder, getOrders };
