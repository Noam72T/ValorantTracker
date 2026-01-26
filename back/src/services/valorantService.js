const axios = require('axios');
const cacheService = require('./cacheService');

const HENRIK_API_BASE = 'https://api.henrikdev.xyz/valorant';

class ValorantService {
  constructor() {
    this.apiKey = process.env.VALORANT_API_KEY || '';
    this.headers = this.apiKey ? { 'Authorization': this.apiKey } : {};
  }

  async getAccount(name, tag) {
    const cacheKey = cacheService.generateKey('account', name, tag);
    const cached = await cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v1/account/${name}/${tag}`,
        { headers: this.headers }
      );
      
      await cacheService.set(cacheKey, 'account', response.data, 1440);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du compte: ${error.message}`);
    }
  }

  async getMMR(region, name, tag) {
    const cacheKey = cacheService.generateKey('mmr', region, name, tag);
    const cached = await cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v2/mmr/${region}/${name}/${tag}`,
        { headers: this.headers }
      );
      
      await cacheService.set(cacheKey, 'mmr', response.data, 30);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du MMR: ${error.message}`);
    }
  }

  async getMatchHistory(region, name, tag, mode = 'competitive', size = 10) {
    const cacheKey = cacheService.generateKey('matches', region, name, tag, mode, size);
    const cached = await cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v3/matches/${region}/${name}/${tag}`,
        { 
          params: { mode, size },
          headers: this.headers
        }
      );
      
      await cacheService.set(cacheKey, 'matches', response.data, 15);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'historique: ${error.message}`);
    }
  }

  async getStoreFeatured() {
    const cacheKey = cacheService.generateKey('store-featured');
    const cached = await cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v1/store-featured`,
        { headers: this.headers }
      );
      
      await cacheService.set(cacheKey, 'store-featured', response.data, 360);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la boutique: ${error.message}`);
    }
  }

  async getPlayerStore(region, name, tag) {
    const cacheKey = cacheService.generateKey('player-store', region, name, tag);
    const cached = await cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const account = await this.getAccount(name, tag);
      if (!account.data || !account.data.puuid) {
        throw new Error('PUUID non trouvé pour ce compte');
      }

      const response = await axios.get(
        `${HENRIK_API_BASE}/v1/store/${account.data.puuid}`,
        { headers: this.headers }
      );
      
      await cacheService.set(cacheKey, 'player-store', response.data, 60);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la boutique: ${error.message}`);
    }
  }

  async getAllSkins() {
    const cacheKey = cacheService.generateKey('all-skins');
    const cached = await cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v1/content`,
        { headers: this.headers }
      );
      
      await cacheService.set(cacheKey, 'all-skins', response.data, 1440);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des skins: ${error.message}`);
    }
  }

  parseRiotId(riotId) {
    if (!riotId || !riotId.includes('#')) {
      throw new Error('Format Riot ID invalide. Utilisez: Pseudo#TAG');
    }
    const [name, tag] = riotId.split('#');
    return { name: name.trim(), tag: tag.trim() };
  }

  determineRegion(riotId) {
    return 'eu';
  }
}

module.exports = new ValorantService();
