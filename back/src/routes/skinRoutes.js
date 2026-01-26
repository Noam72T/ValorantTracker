const express = require('express');
const router = express.Router();
const { protect } = require('../middlerware/auth');
const { validateRequest, schemas } = require('../middlerware/validation');
const {
  getAllSkins,
  getSkinById,
  createSkin
} = require('../controllers/skinController');

router.get('/', getAllSkins);
router.get('/:id', getSkinById);
router.post('/', protect, validateRequest(schemas.createSkin), createSkin);

module.exports = router;
