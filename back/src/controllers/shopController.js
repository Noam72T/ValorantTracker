const { Shop, Skin, Favorite } = require('../models');
const { Op } = require('sequelize');

const getUserShop = async (req, res, next) => {
  try {
    const { date } = req.query;
    const searchDate = date ? new Date(date) : new Date();

    const shops = await Shop.findAll({
      where: {
        userId: req.user.id,
        date: searchDate
      },
      include: [{
        model: Skin,
        as: 'skin'
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: {
        date: searchDate,
        shops
      }
    });
  } catch (error) {
    next(error);
  }
};

const addShopEntry = async (req, res, next) => {
  try {
    const { skinId, price, date } = req.body;

    if (!skinId) {
      return res.status(400).json({
        success: false,
        message: 'skinId est requis'
      });
    }

    const skin = await Skin.findByPk(skinId);
    if (!skin) {
      return res.status(404).json({
        success: false,
        message: 'Skin non trouvé'
      });
    }

    const shopDate = date ? new Date(date) : new Date();

    const [shop, created] = await Shop.findOrCreate({
      where: {
        userId: req.user.id,
        skinId,
        date: shopDate
      },
      defaults: {
        userId: req.user.id,
        skinId,
        price: price || skin.price,
        date: shopDate
      }
    });

    await skin.update({
      appearanceCount: skin.appearanceCount + 1,
      lastAppearance: shopDate
    });

    res.status(created ? 201 : 200).json({
      success: true,
      message: created ? 'Entrée boutique créée' : 'Entrée boutique déjà existante',
      data: shop
    });
  } catch (error) {
    next(error);
  }
};

const getShopHistory = async (req, res, next) => {
  try {
    const { limit = 30, offset = 0 } = req.query;

    const shops = await Shop.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Skin,
        as: 'skin'
      }],
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const total = await Shop.count({ where: { userId: req.user.id } });

    res.status(200).json({
      success: true,
      data: {
        shops,
        total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getShopStats = async (req, res, next) => {
  try {
    const totalShops = await Shop.count({ where: { userId: req.user.id } });
    
    const uniqueSkins = await Shop.count({
      where: { userId: req.user.id },
      distinct: true,
      col: 'skinId'
    });

    const favoriteShops = await Shop.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Skin,
        as: 'skin',
        include: [{
          model: Favorite,
          as: 'favorites',
          where: { userId: req.user.id },
          required: true
        }]
      }]
    });

    res.status(200).json({
      success: true,
      data: {
        totalShops,
        uniqueSkins,
        favoritesInShop: favoriteShops.length
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserShop,
  addShopEntry,
  getShopHistory,
  getShopStats
};
