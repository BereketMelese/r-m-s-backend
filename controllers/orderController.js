const Order = require("../models/order");
const User = require("../models/user");
const Food = require("../models/food");
const Table = require("../models/table");
const Settings = require("../models/setting");
const mongoose = require("mongoose");

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

    const settings = await Settings.findOne();

    const ValidFoods = await Promise.all(
      foods.map(async (item) => {
        const food = await Food.findOne({ name: item.name });
        return food ? { foodId: food._id, quantity: item.quantity } : false;
      })
    );

    const validFoodItems = ValidFoods.filter((item) => item !== null);

    let orderRequiredPoints = totalPrice;
    if (usePoints && settings.paywithPointsEnabled) {
      const requiredPoints = orderRequiredPoints * settings.pointMultiplier;
      if (user.points < requiredPoints) {
        return res.status(400).json({ message: "Not enough points" });
      }
      user.points -= requiredPoints;
      await user.save();
      orderRequiredPoints = 0;
    }

    const order = new Order({
      user: user._id,
      foods: validFoodItems,
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
    const order = await Order.findById(orderId).populate("foods.foodId");
    if (!order) throw new Error("Order not found");

    if (status === "completed" && order.status !== "completed") {
      const user = await User.findById(order.user);

      if (user) {
        let totalPoints = 0;

        for (const foodItem of order.foods) {
          const food = foodItem.foodId;
          if (food) {
            const pointsForThisFood = food.points * foodItem.quantity;
            totalPoints += pointsForThisFood;
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
      .populate({
        path: "foods.foodId",
        model: "Food",
      })
      .populate("table");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  creatOrder,
  updateOrder,
  getOrders,
};
