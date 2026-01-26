const cron = require('node-cron');
const cacheService = require('./cacheService');

const startCacheCleanupScheduler = () => {
  cron.schedule('0 */6 * * *', async () => {
    console.log('[Cache] Nettoyage des entrées expirées');
    await cacheService.clearExpired();
  });

  console.log('[Cache] Nettoyage automatique activé (toutes les 6h)');
};

module.exports = {
  startCacheCleanupScheduler
};
