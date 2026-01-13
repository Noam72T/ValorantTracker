const express = require('express');
const router = express.Router();
const { protect } = require('../middlerware/auth');
const { valorantApiLimiter } = require('../middlerware/rateLimiter');
const {
  getPlayerStats,
  getMatchHistory,
  getStoredMatches,
  deleteAllMatches
} = require('../controllers/valorantController');

router.get('/stats', protect, valorantApiLimiter, getPlayerStats);
router.get('/matches', protect, valorantApiLimiter, getMatchHistory);
router.get('/matches/stored', protect, getStoredMatches);
router.delete('/matches', protect, deleteAllMatches);

module.exports = router;
