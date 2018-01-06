module.exports = (sequelize, DataTypes) =>
  sequelize.define('subject', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.TEXT, allowNull: true },
  })