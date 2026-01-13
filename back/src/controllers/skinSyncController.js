const axios = require('axios');
const Skin = require('../models/Skin');

const syncAllSkins = async (req, res) => {
  try {
    const weaponsResponse = await axios.get('https://valorant-api.com/v1/weapons');
    
    if (!weaponsResponse.data || !weaponsResponse.data.data) {
      return res.status(404).json({
        success: false,
        message: 'Impossible de récupérer les armes depuis l\'API'
      });
    }

    const weapons = weaponsResponse.data.data;
    let created = 0;
    let updated = 0;

    for (const weapon of weapons) {
      if (!weapon.skins || weapon.skins.length === 0) continue;

      for (const skinData of weapon.skins) {
        if (!skinData.displayName || skinData.displayName === 'Standard' || skinData.displayName.includes('Random')) {
          continue;
        }

        const [skin, isCreated] = await Skin.findOrCreate({
          where: { skinId: skinData.uuid },
          defaults: {
            skinId: skinData.uuid,
            name: skinData.displayName,
            displayName: skinData.displayName,
            rarity: skinData.contentTierUuid ? 'Premium' : 'Standard',
            imageUrl: skinData.displayIcon || skinData.chromas?.[0]?.displayIcon,
            videoUrl: skinData.streamedVideo,
            weaponType: weapon.displayName,
            contentTierUuid: skinData.contentTierUuid,
            themeUuid: skinData.themeUuid,
            appearanceCount: 0
          }
        });

        if (isCreated) {
          created++;
        } else {
          await skin.update({
            name: skinData.displayName,
            displayName: skinData.displayName,
            imageUrl: skinData.displayIcon || skinData.chromas?.[0]?.displayIcon,
            videoUrl: skinData.streamedVideo,
            weaponType: weapon.displayName
          });
          updated++;
        }
      }
    }

    res.status(200).json({
      success: true,
      message: `Synchronisation terminée: ${created} skins créés, ${updated} mis à jour`,
      data: {
        created,
        updated,
        total: created + updated
      }
    });
  } catch (error) {
    console.error('Erreur sync skins:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la synchronisation des skins'
    });
  }
};

const getSyncStatus = async (req, res) => {
  try {
    const totalSkins = await Skin.count();
    const lastSync = await Skin.findOne({
      order: [['updatedAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: {
        totalSkins,
        lastSync: lastSync?.updatedAt || null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la récupération du statut'
    });
  }
};

module.exports = {
  syncAllSkins,
  getSyncStatus
};
