module.exports = (sequelize, DataTypes) =>
  sequelize.define('user', {
    address: DataTypes.TEXT,
    weigth: DataTypes.TEXT
  })