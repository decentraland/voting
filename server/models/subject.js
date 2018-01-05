module.exports = (sequelize, DataTypes) =>
  sequelize.define('subject', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT
  })