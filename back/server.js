const app = require('./src/app');
const { connectDB, sequelize } = require('./src/config/database');
const { startGdprCleanupScheduler } = require('./src/services/gdprCleanupService');
const { startCacheCleanupScheduler } = require('./src/services/cacheCleanupService');

const PORT = process.env.PORT || 5000;

connectDB();

(async () => {
  await sequelize.authenticate();
  console.log(' Connexion à la base de données réussie');

  startGdprCleanupScheduler();
  startCacheCleanupScheduler();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
