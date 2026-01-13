const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Trop de requêtes. Veuillez réessayer dans 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const valorantApiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Trop de requêtes vers l\'API Valorant. Veuillez patienter 2 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

module.exports = {
  loginLimiter,
  apiLimiter,
  valorantApiLimiter
};
