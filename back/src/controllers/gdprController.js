const User = require('../models/User');
const { Favorite, Match, Shop, StatsCollection, UserStats } = require('../models');

const updateConsent = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    if (req.body.consentGiven !== undefined) {
      user.consentGiven = req.body.consentGiven;
      user.consentDate = req.body.consentGiven ? new Date() : null;
    }
    if (req.body.dataProcessingConsent !== undefined) {
      user.dataProcessingConsent = req.body.dataProcessingConsent;
    }
    if (req.body.marketingConsent !== undefined) {
      user.marketingConsent = req.body.marketingConsent;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Consentements mis à jour',
      data: {
        consentGiven: user.consentGiven,
        consentDate: user.consentDate,
        dataProcessingConsent: user.dataProcessingConsent,
        marketingConsent: user.marketingConsent
      }
    });
  } catch (error) {
    next(error);
  }
};

const exportUserData = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    const favorites = await Favorite.findAll({ where: { userId: req.user.id } });
    const matches = await Match.findAll({ where: { userId: req.user.id } });
    const shops = await Shop.findAll({ where: { userId: req.user.id } });
    const stats = await UserStats.findAll({ where: { userId: req.user.id } });
    const statsCollections = await StatsCollection.findAll({ where: { userId: req.user.id } });

    res.json({
      success: true,
      message: 'Données exportées',
      data: {
        user: user.toJSON(),
        favorites: favorites.map(f => f.toJSON()),
        matches: matches.map(m => m.toJSON()),
        shops: shops.map(s => s.toJSON()),
        stats: stats.map(s => s.toJSON()),
        statsCollections: statsCollections.map(sc => sc.toJSON()),
        exportDate: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

const requestDeletion = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    user.deletionRequestedAt = new Date();
    await user.save();

    const deletionDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    res.json({
      success: true,
      message: 'Suppression programmée dans 30 jours',
      data: {
        deletionRequestedAt: user.deletionRequestedAt,
        scheduledDeletionDate: deletionDate
      }
    });
  } catch (error) {
    next(error);
  }
};

const cancelDeletion = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    if (!user.deletionRequestedAt) {
      return res.status(400).json({ success: false, message: 'Aucune demande en cours' });
    }

    user.deletionRequestedAt = null;
    await user.save();

    res.json({ success: true, message: 'Suppression annulée' });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ success: false, message: 'Mot de passe requis' });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await user.comparePassword(req.body.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Mot de passe incorrect' });
    }

    await Favorite.destroy({ where: { userId: req.user.id } });
    await Match.destroy({ where: { userId: req.user.id } });
    await Shop.destroy({ where: { userId: req.user.id } });
    await UserStats.destroy({ where: { userId: req.user.id } });
    await StatsCollection.destroy({ where: { userId: req.user.id } });
    await user.destroy();

    res.json({ success: true, message: 'Compte supprimé' });
  } catch (error) {
    next(error);
  }
};

const getConsentStatus = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['consentGiven', 'consentDate', 'dataProcessingConsent', 'marketingConsent', 'deletionRequestedAt']
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    res.json({
      success: true,
      data: {
        consentGiven: user.consentGiven,
        consentDate: user.consentDate,
        dataProcessingConsent: user.dataProcessingConsent,
        marketingConsent: user.marketingConsent,
        deletionRequestedAt: user.deletionRequestedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateConsent,
  exportUserData,
  requestDeletion,
  cancelDeletion,
  deleteAccount,
  getConsentStatus
};
