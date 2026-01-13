const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const StatsCollection = sequelize.define('StatsCollection', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
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
  appearanceCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  daysSinceLastAppearance: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  probabilityScore: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  tableName: 'stats_collections',
  timestamps: true,
  indexes: [
    { fields: ['date'] },
    { fields: ['skinId'] },
    { unique: true, fields: ['date', 'skinId'] }
  ]
});

module.exports = StatsCollection;
