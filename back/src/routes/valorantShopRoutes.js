const express = require('express');
const router = express.Router();
const { protect } = require('../middlerware/auth');
const { valorantApiLimiter } = require('../middlerware/rateLimiter');
const {
  getPlayerShop,
  getFeaturedShop
} = require('../controllers/valorantShopController');

router.get('/my-shop', protect, valorantApiLimiter, getPlayerShop);
router.get('/featured', getFeaturedShop);

module.exports = router;
