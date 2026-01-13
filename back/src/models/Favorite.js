const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  skinId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'skins',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  notificationEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'favorites',
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['skinId'] },
    { unique: true, fields: ['userId', 'skinId'] }
  ]
});

module.exports = Favorite;
