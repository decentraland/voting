module.exports = (sequelize, DataTypes) => {
  const Receipt = sequelize.define('receipt', {
    vote: { type: DataTypes.TEXT, allowNull: false },
  })

  Receipt.associate = models => {
    Receipt.belongsTo(models.user)
    Receipt.belongsTo(models.subject)
  }
  return Receipt
}