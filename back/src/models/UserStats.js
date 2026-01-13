const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserStats = sequelize.define('UserStats', {
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
  currentRank: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rankingInTier: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  mmr: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  elo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  accountLevel: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user_stats',
  timestamps: true
});

module.exports = UserStats;
