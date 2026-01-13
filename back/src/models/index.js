const User = require('./User');
const Skin = require('./Skin');
const Shop = require('./Shop');
const Favorite = require('./Favorite');
const StatsCollection = require('./StatsCollection');
const Match = require('./Match');
const UserStats = require('./UserStats');

User.hasMany(Shop, { foreignKey: 'userId', as: 'shops' });
Shop.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Match, { foreignKey: 'userId', as: 'matches' });
Match.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(UserStats, { foreignKey: 'userId', as: 'stats' });
UserStats.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Skin.hasMany(Shop, { foreignKey: 'skinId', as: 'shops' });
Shop.belongsTo(Skin, { foreignKey: 'skinId', as: 'skin' });

Skin.hasMany(Favorite, { foreignKey: 'skinId', as: 'favorites' });
Favorite.belongsTo(Skin, { foreignKey: 'skinId', as: 'skin' });

Skin.hasMany(StatsCollection, { foreignKey: 'skinId', as: 'stats' });
StatsCollection.belongsTo(Skin, { foreignKey: 'skinId', as: 'skin' });

module.exports = {
  User,
  Skin,
  Shop,
  Favorite,
  StatsCollection,
  Match,
  UserStats
};
