'use strict';
module.exports = (sequelize, DataTypes) => {
  const SteamGame = sequelize.define('SteamGame', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    appid: DataTypes.STRING
  }, {});
  SteamGame.associate = function (models) {
    // associations can be defined here
  };
  return SteamGame;
};