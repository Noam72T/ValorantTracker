const valorantService = require('../services/valorantService');
const Shop = require('../models/Shop');
const Skin = require('../models/Skin');

const getPlayerShop = async (req, res, next) => {
  try {
    const user = req.user;
    
    if (!user.riotId) {
      return res.status(400).json({
        success: false,
        message: 'Riot ID non configuré. Veuillez ajouter votre Riot ID dans votre profil.'
      });
    }

    const { name, tag } = valorantService.parseRiotId(user.riotId);
    const region = valorantService.determineRegion(user.riotId);

    const shopData = await valorantService.getPlayerStore(region, name, tag).catch(err => null);

    if (!shopData || !shopData.data) {
      return res.status(404).json({
        success: false,
        message: 'Impossible de récupérer votre boutique Valorant. Assurez-vous que votre compte est accessible.'
      });
    }

    const today = new Date().toISOString().split('T')[0];
    const skinOffers = shopData.data.SkinsPanelLayout?.SingleItemOffers || [];

    const skinsInShop = [];
    for (const skinUuid of skinOffers) {
      let skin = await Skin.findOne({ where: { skinId: skinUuid } });
      
      if (!skin) {
        skin = await Skin.create({
          skinId: skinUuid,
          name: `Skin ${skinUuid.substring(0, 8)}`,
          displayName: `Skin ${skinUuid.substring(0, 8)}`,
          appearanceCount: 1,
          lastAppearance: new Date()
        });
      } else {
        await skin.update({
          appearanceCount: skin.appearanceCount + 1,
          lastAppearance: new Date()
        });
      }

      await Shop.findOrCreate({
        where: {
          userId: user.id,
          skinId: skin.id,
          date: today
        },
        defaults: {
          userId: user.id,
          skinId: skin.id,
          date: today
        }
      });

      skinsInShop.push(skin);
    }

    res.status(200).json({
      success: true,
      data: {
        date: today,
        skins: skinsInShop,
        remainingDuration: shopData.data.SkinsPanelLayout?.SingleItemOffersRemainingDurationInSeconds || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la récupération de votre boutique'
    });
  }
};

const getFeaturedShop = async (req, res, next) => {
  try {
    const shopData = await valorantService.getStoreFeatured().catch(err => null);

    if (!shopData || !shopData.data) {
      return res.status(404).json({
        success: false,
        message: 'Impossible de récupérer la boutique featured'
      });
    }

    res.status(200).json({
      success: true,
      data: shopData.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la récupération de la boutique featured'
    });
  }
};

module.exports = {
  getPlayerShop,
  getFeaturedShop
};
