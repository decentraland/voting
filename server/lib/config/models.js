const Sequelize = require('sequelize')

const connection = new Sequelize('voting_schema', 'andresmijares', 'postgres',
  {
    dialect: 'postgres',
    define: {
      underscored: true
    }
  })

/* Models definitions */
const Subject = connection.define('subject', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  image: Sequelize.TEXT
})

const User = connection.define('user', {
  address: {
    type: Sequelize.TEXT,
    unique: true
  },
  weight: Sequelize.TEXT
})

const Vote = connection.define('vote', {
  vote: Sequelize.TEXT
})

/* Associations */
Vote.belongsTo(User, {
  foreignKey: 'address',
  targetKey: 'address'
})

Vote.belongsTo(Subject)

module.exports = connection
