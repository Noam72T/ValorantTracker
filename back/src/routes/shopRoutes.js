const express = require('express');
const router = express.Router();
const { protect } = require('../middlerware/auth');
const { validateRequest, schemas } = require('../middlerware/validation');
const {
  getUserShop,
  addShopEntry,
  getShopHistory,
  getShopStats
} = require('../controllers/shopController');

router.get('/', protect, getUserShop);
router.post('/', protect, validateRequest(schemas.addShopEntry), addShopEntry);
router.get('/history', protect, getShopHistory);
router.get('/stats', protect, getShopStats);

module.exports = router;
