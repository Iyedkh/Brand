const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// @desc    Get complete dashboard stats
// @route   GET /api/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  // Aggregate total sales from delivered/paid orders (or all orders depending on business logic - we'll sum totalPrice of all for now)
  const orders = await Order.find({});
  const totalSales = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
  const ordersCount = orders.length;

  // Get total counts
  const usersCount = await User.countDocuments({});
  const productsCount = await Product.countDocuments({});

  // Optional: Get recent activities (e.g. 5 latest orders)
  const recentOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'username');
  
  res.json({
    stats: {
      totalSales: totalSales.toFixed(2),
      ordersCount,
      usersCount,
      productsCount
    },
    activities: recentOrders
  });
});

module.exports = {
  getDashboardStats
};
