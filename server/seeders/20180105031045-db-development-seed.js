'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert('subjects', [{
        title: 'Should new land be sold at 1000 MANA per unit, on a first-come first-serve basis?',
        description: 'lorem ipsum',
        created_at: new Date(),
        updated_at: new Date()
      }], {})
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('subjects', [{
      title: 'Should new land be sold at 1000 MANA per unit, on a first-come first-serve basis?'
    }])
  }
}
