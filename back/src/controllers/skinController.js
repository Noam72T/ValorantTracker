const { Skin } = require('../models');
const { Op } = require('sequelize');

const getAllSkins = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0, rarity, weaponType, search } = req.query;

    const where = {};
    if (rarity) where.rarity = rarity;
    if (weaponType) where.weaponType = weaponType;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { displayName: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const skins = await Skin.findAll({
      where,
      order: [['displayName', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const total = await Skin.count({ where });

    res.status(200).json({
      success: true,
      data: {
        skins,
        total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getSkinById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const skin = await Skin.findByPk(id);

    if (!skin) {
      return res.status(404).json({
        success: false,
        message: 'Skin non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: skin
    });
  } catch (error) {
    next(error);
  }
};

const createSkin = async (req, res, next) => {
  try {
    const {
      skinId,
      name,
      displayName,
      rarity,
      price,
      imageUrl,
      videoUrl,
      weaponType,
      contentTierUuid,
      themeUuid
    } = req.body;

    if (!skinId || !name || !displayName) {
      return res.status(400).json({
        success: false,
        message: 'skinId, name et displayName sont requis'
      });
    }

    const [skin, created] = await Skin.findOrCreate({
      where: { skinId },
      defaults: {
        skinId,
        name,
        displayName,
        rarity,
        price,
        imageUrl,
        videoUrl,
        weaponType,
        contentTierUuid,
        themeUuid
      }
    });

    res.status(created ? 201 : 200).json({
      success: true,
      message: created ? 'Skin créé' : 'Skin déjà existant',
      data: skin
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSkins,
  getSkinById,
  createSkin
};
