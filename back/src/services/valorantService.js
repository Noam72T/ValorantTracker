const axios = require('axios');

const HENRIK_API_BASE = 'https://api.henrikdev.xyz/valorant';

class ValorantService {
  constructor() {
    this.apiKey = process.env.VALORANT_API_KEY || '';
    this.headers = this.apiKey ? { 'Authorization': this.apiKey } : {};
  }

  async getAccount(name, tag) {
    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v1/account/${name}/${tag}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du compte: ${error.message}`);
    }
  }

  async getMMR(region, name, tag) {
    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v2/mmr/${region}/${name}/${tag}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du MMR: ${error.message}`);
    }
  }

  async getMatchHistory(region, name, tag, mode = 'competitive', size = 10) {
    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v3/matches/${region}/${name}/${tag}`,
        { 
          params: { mode, size },
          headers: this.headers
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'historique: ${error.message}`);
    }
  }

  async getStoreFeatured() {
    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v1/store-featured`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la boutique: ${error.message}`);
    }
  }

  async getPlayerStore(region, name, tag) {
    try {
      const account = await this.getAccount(name, tag);
      if (!account.data || !account.data.puuid) {
        throw new Error('PUUID non trouvé pour ce compte');
      }

      const response = await axios.get(
        `${HENRIK_API_BASE}/v1/store/${account.data.puuid}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la boutique: ${error.message}`);
    }
  }

  async getAllSkins() {
    try {
      const response = await axios.get(
        `${HENRIK_API_BASE}/v1/content`,
        { headers: this.headers }
      );
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
