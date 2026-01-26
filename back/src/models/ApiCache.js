const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ApiCache = sequelize.define('ApiCache', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  cacheKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'api_cache',
  timestamps: true,
  indexes: [
    { fields: ['cacheKey'] },
    { fields: ['expiresAt'] }
  ]
});

module.exports = ApiCache;
