const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Skin = sequelize.define('Skin', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  skinId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rarity: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Select, Deluxe, Premium, Ultra, Exclusive'
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Prix en VP (Valorant Points)'
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  weaponType: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Vandal, Phantom, Operator, etc.'
  },
  contentTierUuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  themeUuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  appearanceCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Nombre apparitions en boutique'
  },
  lastAppearance: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Derniere apparition en boutique'
  }
}, {
  tableName: 'skins',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['skinId'] },
    { fields: ['rarity'] },
    { fields: ['weaponType'] }
  ]
});

module.exports = Skin;
