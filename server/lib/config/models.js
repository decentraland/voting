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
  address: Sequelize.TEXT,
  weigth: Sequelize.TEXT
})

const Vote = connection.define('vote', {
  vote: Sequelize.TEXT
})

/* Associations */
Vote.belongsTo(User)

Vote.belongsTo(Subject)

module.exports = {
  connection,
  models: {
    Subject,
    User,
    Vote
  }
}
