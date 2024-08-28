const Order = require("../models/order");

const calculateDailySales = async (date) => {
  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  const sales = await Order.aggregate([
    { $match: { status: "completed", createdAt: { $gte: start, $lt: end } } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  return sales[0] || { totalRevenue: 0, totalOrders: 0 };
};

const calculateMonthlySales = async (month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  const sales = await Order.aggregate([
    { $match: { status: "completed", createdAt: { $gte: start, $lt: end } } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  return sales[0] || { totalRevenue: 0, totalOrders: 0 };
};

module.exports = {
  calculateDailySales,
  calculateMonthlySales,
};
