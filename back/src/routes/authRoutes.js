const express = require('express');
const router = express.Router();
const { protect } = require('../middlerware/auth');
const { loginLimiter } = require('../middlerware/rateLimiter');
const { validateRequest, schemas } = require('../middlerware/validation');
const {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword
} = require('../controllers/authController');

router.post('/register', validateRequest(schemas.register), register);
router.post('/login', loginLimiter, validateRequest(schemas.login), login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, validateRequest(schemas.updateProfile), updateProfile);
router.put('/password', protect, validateRequest(schemas.updatePassword), updatePassword);

module.exports = router;
