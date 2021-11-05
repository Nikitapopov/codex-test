'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    name: DataTypes.STRING,
    artistId: DataTypes.INTEGER
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.Artist, {
      foreignKey: 'artistId',
      as: 'artist',
      onDelete: 'CASCADE',
    })
  };
  return Song;
};