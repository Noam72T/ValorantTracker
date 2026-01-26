const { Favorite, Skin } = require('../models');

const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Skin,
        as: 'skin'
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: favorites
    });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { skinId, notificationEnabled = true } = req.body;

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

    const [favorite, created] = await Favorite.findOrCreate({
      where: {
        userId: req.user.id,
        skinId
      },
      defaults: {
        userId: req.user.id,
        skinId,
        notificationEnabled
      }
    });

    if (!created) {
      return res.status(400).json({
        success: false,
        message: 'Ce skin est déjà dans vos favoris'
      });
    }

    const favoriteWithSkin = await Favorite.findByPk(favorite.id, {
      include: [{ model: Skin, as: 'skin' }]
    });

    res.status(201).json({
      success: true,
      message: 'Skin ajouté aux favoris',
      data: favoriteWithSkin
    });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const favorite = await Favorite.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favori non trouvé'
      });
    }

    await favorite.destroy();

    res.status(200).json({
      success: true,
      message: 'Skin retiré des favoris'
    });
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notificationEnabled } = req.body;

    const favorite = await Favorite.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favori non trouvé'
      });
    }

    if (notificationEnabled !== undefined) {
      favorite.notificationEnabled = notificationEnabled;
    }

    await favorite.save();

    const updatedFavorite = await Favorite.findByPk(favorite.id, {
      include: [{ model: Skin, as: 'skin' }]
    });

    res.status(200).json({
      success: true,
      message: 'Favori mis à jour',
      data: updatedFavorite
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
  updateFavorite
};
