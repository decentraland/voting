module.exports = (sequelize, DataTypes) =>
  sequelize.define('subject', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    visible: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.TEXT, allowNull: true }
  })
