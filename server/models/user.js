module.exports = (sequelize, DataTypes) =>
  sequelize.define('user', {
    address: { type: DataTypes.TEXT, allowNull: false },
    weigth: { type: DataTypes.TEXT, allowNull: false },
  })