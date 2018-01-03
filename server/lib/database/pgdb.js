module.exports = pgPool => {
  return {
    getSubject (id) {
      return new Promise(resolve => {
        resolve({
          title: 'Title',
          description: 'description',
          image: 'image here',
          address_count: 100,
          votes_weight: 100,
          yes_weight: 100, // mana
          abstentions_weight: 100,
          no_weight: 100, // mana
          yes_count: 100,
          abstentions_count: 100,
          no_count: 100
        })
      })
    }
  }
}
