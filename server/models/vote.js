module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('vote', {
    vote: { type: DataTypes.TEXT, allowNull: false },
  })

  Vote.associate = models => {
    Vote.belongsTo(models.user)
    Vote.belongsTo(models.subject)
  }
  return Vote
}
