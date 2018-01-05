module.exports = (sequelize, DataTypes) =>
  sequelize.define('subject', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.TEXT, allowNull: false },
  })