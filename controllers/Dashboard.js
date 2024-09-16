const Food = require("../models/food");
const Order = require("../models/order");
const User = require("../models/user");

const getDashboardData = async (req, res) => {
  try {
    const totalFoods = await Food.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalRevenueResult = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);
    const totalRevenue = totalRevenueResult[0]
      ? totalRevenueResult[0].totalRevenue
      : 0;

    res.json({
      totalFoods,
      totalOrders,
      totalUsers,
      totalRevenue,
    });
    console.log(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDashboardData };
