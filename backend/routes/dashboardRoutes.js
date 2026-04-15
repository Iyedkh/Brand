const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getDashboardStats);

module.exports = router;
