const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Match = sequelize.define('Match', {
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
  matchId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gameMode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  map: {
    type: DataTypes.STRING,
    allowNull: true
  },
  agent: {
    type: DataTypes.STRING,
    allowNull: true
  },
  kills: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  deaths: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  assists: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  won: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  roundsWon: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  roundsLost: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  matchDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  rankBefore: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rankAfter: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rrChange: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  tableName: 'matches',
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { unique: true, fields: ['matchId'] },
    { fields: ['matchDate'] }
  ]
});

module.exports = Match;
