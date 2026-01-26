const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const valorantRoutes = require('./valorantRoutes');
const valorantShopRoutes = require('./valorantShopRoutes');
const shopRoutes = require('./shopRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const skinRoutes = require('./skinRoutes');
const skinSyncRoutes = require('./skinSyncRoutes');
const gdprRoutes = require('./gdprRoutes');

router.use('/auth', authRoutes);
router.use('/valorant', valorantRoutes);
router.use('/valorant-shop', valorantShopRoutes);
router.use('/shop', shopRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/skins', skinRoutes);
router.use('/skin-sync', skinSyncRoutes);
router.use('/gdpr', gdprRoutes);

module.exports = router;
