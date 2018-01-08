module.exports = (sequelize, DataTypes) => {
  const Receipt = sequelize.define('receipt', {
    user_message: { type: DataTypes.TEXT, allowNull: false },
    user_signature: { type: DataTypes.TEXT, allowNull: false },
    server_message: { type: DataTypes.TEXT, allowNull: false },
    server_signature: { type: DataTypes.TEXT, allowNull: false },
    vote: { type: DataTypes.TEXT, allowNull: false }
  })
  Receipt.associate = models => {
    Receipt.belongsTo(models.user)
    Receipt.belongsTo(models.subject)
  }
  return Receipt
}
