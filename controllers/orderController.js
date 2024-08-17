const Order = require("../models/order");
const User = require("../models/User");
const Food = require("../models/food");

const creatOrder = async (req, res) => {
  try {
    const { userName, foods, totalPrice } = req.body;
    let user = await User.findOne({ username: userName });

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
