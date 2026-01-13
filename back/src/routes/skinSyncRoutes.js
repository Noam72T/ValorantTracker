const express = require('express');
const router = express.Router();
const { protect } = require('../middlerware/auth');
const {
  syncAllSkins,
  getSyncStatus
} = require('../controllers/skinSyncController');

router.post('/sync', protect, syncAllSkins);
router.get('/status', getSyncStatus);

module.exports = router;
