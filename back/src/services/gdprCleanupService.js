const cron = require('node-cron');
const { Op } = require('sequelize');
const User = require('../models/User');
const { Favorite, Match, Shop, StatsCollection, UserStats } = require('../models');

const deleteExpiredAccounts = async () => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const users = await User.findAll({
      where: { deletionRequestedAt: { [Op.lte]: thirtyDaysAgo } }
    });

    for (const user of users) {
      await Favorite.destroy({ where: { userId: user.id } });
      await Match.destroy({ where: { userId: user.id } });
      await Shop.destroy({ where: { userId: user.id } });
      await UserStats.destroy({ where: { userId: user.id } });
      await StatsCollection.destroy({ where: { userId: user.id } });
      await user.destroy();
      
      console.log(`[GDPR] Compte ${user.id} supprimé`);
    }

    if (users.length > 0) {
      console.log(`[GDPR] ${users.length} compte(s) supprimé(s)`);
    }
  } catch (error) {
    console.error('[GDPR] Erreur:', error);
  }
};

const startGdprCleanupScheduler = () => {
  cron.schedule('0 2 * * *', async () => {
    console.log('[GDPR] Nettoyage automatique');
    await deleteExpiredAccounts();
  });

  console.log('[GDPR] Nettoyage RGPD activé (2h du matin)');
};

module.exports = {
  startGdprCleanupScheduler,
  deleteExpiredAccounts
};
