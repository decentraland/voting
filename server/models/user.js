module.exports = (sequelize, DataTypes) =>
  sequelize.define('user', {
    address: { type: DataTypes.TEXT, allowNull: false },
    weight: { type: DataTypes.BIGINT, allowNull: false }
  })
