const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors
      });
    }
    
    next();
  };
};

const schemas = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email invalide',
      'any.required': 'Email est requis'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
      'any.required': 'Mot de passe est requis'
    }),
    username: Joi.string().optional().allow('', null)
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    email: Joi.string().email().optional(),
    username: Joi.string().optional().allow('', null),
    riotId: Joi.string().optional().allow('', null).pattern(/^.+#.+$/).messages({
      'string.pattern.base': 'Format Riot ID invalide. Utilisez: Pseudo#TAG'
    })
  }),

  updatePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  }),

  addFavorite: Joi.object({
    skinId: Joi.string().uuid().required(),
    notificationEnabled: Joi.boolean().optional()
  }),

  addShopEntry: Joi.object({
    skinId: Joi.string().uuid().required(),
    price: Joi.number().integer().min(0).optional(),
    date: Joi.date().optional()
  }),

  createSkin: Joi.object({
    skinId: Joi.string().required(),
    name: Joi.string().required(),
    displayName: Joi.string().required(),
    rarity: Joi.string().optional().allow('', null),
    price: Joi.number().integer().min(0).optional(),
    imageUrl: Joi.string().uri().optional().allow('', null),
    videoUrl: Joi.string().uri().optional().allow('', null),
    weaponType: Joi.string().optional().allow('', null),
    contentTierUuid: Joi.string().optional().allow('', null),
    themeUuid: Joi.string().optional().allow('', null)
  })
};

module.exports = {
  validateRequest,
  schemas
};
