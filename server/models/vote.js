module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('vote', {
    vote: DataTypes.TEXT
  })

  Vote.associate = models => {
    Vote.belongsTo(models.user)
    Vote.belongsTo(models.subject)
  }
  return Vote
}