const ApiCache = require('../models/ApiCache');
const { Op } = require('sequelize');

class CacheService {
  async get(cacheKey) {
    try {
      const cached = await ApiCache.findOne({
        where: {
          cacheKey,
          expiresAt: { [Op.gt]: new Date() }
        }
      });

      if (cached) {
        return cached.data;
      }

      return null;
    } catch (error) {
      console.error('Erreur cache get:', error);
      return null;
    }
  }

  async set(cacheKey, endpoint, data, ttlMinutes = 60) {
    try {
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + ttlMinutes);

      await ApiCache.upsert({
        cacheKey,
        endpoint,
        data,
        expiresAt
      });

      return true;
    } catch (error) {
      console.error('Erreur cache set:', error);
      return false;
    }
  }

  async delete(cacheKey) {
    try {
      await ApiCache.destroy({ where: { cacheKey } });
      return true;
    } catch (error) {
      console.error('Erreur cache delete:', error);
      return false;
    }
  }

  async clearExpired() {
    try {
      const deleted = await ApiCache.destroy({
        where: {
          expiresAt: { [Op.lt]: new Date() }
        }
      });
      console.log(`[Cache] ${deleted} entrées expirées supprimées`);
      return deleted;
    } catch (error) {
      console.error('Erreur cache clearExpired:', error);
      return 0;
    }
  }

  async clearAll() {
    try {
      await ApiCache.destroy({ where: {} });
      return true;
    } catch (error) {
      console.error('Erreur cache clearAll:', error);
      return false;
    }
  }

  generateKey(prefix, ...params) {
    return `${prefix}:${params.join(':')}`;
  }
}

module.exports = new CacheService();
