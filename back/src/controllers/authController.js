const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe sont requis'
      });
    }

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }

    const user = await User.create({
      email,
      password,
      username: username || null
    });

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          riotId: user.riotId,
          favoritesSkins: user.favoritesSkins
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe sont requis'
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          riotId: user.riotId,
          favoritesSkins: user.favoritesSkins
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          riotId: user.riotId,
          favoritesSkins: user.favoritesSkins,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { username, riotId, email } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Cet email est déjà utilisé'
        });
      }
      user.email = email;
    }

    if (username !== undefined) user.username = username;
    if (riotId !== undefined) user.riotId = riotId;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          riotId: user.riotId,
          favoritesSkins: user.favoritesSkins,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel et nouveau mot de passe sont requis'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le nouveau mot de passe doit contenir au moins 6 caractères'
      });
    }

    const user = await User.findByPk(req.user.id);

    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Mot de passe mis à jour avec succès'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword
};
