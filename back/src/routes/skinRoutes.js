const express = require('express');
const router = express.Router();
const { protect } = require('../middlerware/auth');
const { validateRequest, schemas } = require('../middlerware/validation');
const {
  getAllSkins,
  getSkinById,
  getProbabilities,
  getSkinProbability,
  createSkin
} = require('../controllers/skinController');

router.get('/', getAllSkins);
router.get('/probabilities', getProbabilities);
router.get('/:id', getSkinById);
router.get('/:id/probability', getSkinProbability);
router.post('/', protect, validateRequest(schemas.createSkin), createSkin);

module.exports = router;
