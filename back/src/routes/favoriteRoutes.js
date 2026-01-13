const express = require('express');
const router = express.Router();
const { protect } = require('../middlerware/auth');
const { validateRequest, schemas } = require('../middlerware/validation');
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  updateFavorite
} = require('../controllers/favoriteController');

router.get('/', protect, getFavorites);
router.post('/', protect, validateRequest(schemas.addFavorite), addFavorite);
router.delete('/:id', protect, removeFavorite);
router.put('/:id', protect, updateFavorite);

module.exports = router;
