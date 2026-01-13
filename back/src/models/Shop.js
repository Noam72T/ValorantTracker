const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Shop = sequelize.define('Shop', {
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
  price: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'shops',
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['date'] },
    { fields: ['skinId'] },
    { unique: true, fields: ['userId', 'date', 'skinId'] }
  ]
});

module.exports = Shop;
