const { Skin, StatsCollection } = require('../models');
const { Op } = require('sequelize');

class ProbabilityService {
  async calculateProbability(skinId) {
    try {
      const skin = await Skin.findByPk(skinId);
      if (!skin) {
        throw new Error('Skin non trouvé');
      }

      const daysSinceLastAppearance = skin.lastAppearance 
        ? Math.floor((Date.now() - new Date(skin.lastAppearance)) / (1000 * 60 * 60 * 24))
        : 365;

      const totalAppearances = skin.appearanceCount || 0;

      const rarityWeight = this.getRarityWeight(skin.rarity);

      let probabilityScore = 0;

      if (daysSinceLastAppearance > 90) {
        probabilityScore += 0.4;
      } else if (daysSinceLastAppearance > 60) {
        probabilityScore += 0.3;
      } else if (daysSinceLastAppearance > 30) {
        probabilityScore += 0.2;
      } else if (daysSinceLastAppearance > 14) {
        probabilityScore += 0.1;
      }

      if (totalAppearances < 5) {
        probabilityScore += 0.3;
      } else if (totalAppearances < 10) {
        probabilityScore += 0.2;
      } else if (totalAppearances < 20) {
        probabilityScore += 0.1;
      }

      probabilityScore *= rarityWeight;

      probabilityScore = Math.min(Math.max(probabilityScore, 0), 1);

      await StatsCollection.create({
        date: new Date(),
        skinId: skin.id,
        appearanceCount: totalAppearances,
        daysSinceLastAppearance,
        probabilityScore,
        metadata: {
          rarity: skin.rarity,
          calculatedAt: new Date()
        }
      });

      return {
        skinId: skin.id,
        skinName: skin.displayName,
        probabilityScore: Math.round(probabilityScore * 100),
        daysSinceLastAppearance,
        totalAppearances,
        rarity: skin.rarity,
        estimatedNextAppearance: this.estimateNextAppearance(daysSinceLastAppearance, probabilityScore)
      };
    } catch (error) {
      throw new Error(`Erreur calcul probabilité: ${error.message}`);
    }
  }

  getRarityWeight(rarity) {
    const weights = {
      'Exclusive': 0.6,
      'Ultra': 0.8,
      'Premium': 1.0,
      'Deluxe': 1.2,
      'Select': 1.4
    };
    return weights[rarity] || 1.0;
  }

  estimateNextAppearance(daysSince, probability) {
    if (probability > 0.7) {
      return '1-7 jours';
    } else if (probability > 0.5) {
      return '7-14 jours';
    } else if (probability > 0.3) {
      return '14-30 jours';
    } else {
      return '30+ jours';
    }
  }

  async calculateAllProbabilities() {
    try {
      const skins = await Skin.findAll();
      const probabilities = [];

      for (const skin of skins) {
        try {
          const prob = await this.calculateProbability(skin.id);
          probabilities.push(prob);
        } catch (error) {
          console.error(`Erreur pour skin ${skin.id}:`, error.message);
        }
      }

      return probabilities.sort((a, b) => b.probabilityScore - a.probabilityScore);
    } catch (error) {
      throw new Error(`Erreur calcul probabilités: ${error.message}`);
    }
  }

  async getTopProbabilities(limit = 10) {
    try {
      const allProbs = await this.calculateAllProbabilities();
      return allProbs.slice(0, limit);
    } catch (error) {
      throw new Error(`Erreur récupération top probabilités: ${error.message}`);
    }
  }
}

module.exports = new ProbabilityService();
