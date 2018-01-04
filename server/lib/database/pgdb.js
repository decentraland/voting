const models = require('../config/models').models

const findOrCreate = async (model, cond, value, data) => {
  let instance = await model.find({
    where: {
      [cond]: value
    }
  })

  if (!instance) {
    instance = await model.create(data)
  }

  return instance
}

module.exports = {
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
  },
  getVotesPerSubject (data) {
    return new Promise(resolve => {
      resolve({ok: true})
    })
  },
  postVotesPerSubject: async (subjectId, data) => {
    const User = models.User
    const Subject = models.Subject
    const Vote = models.Vote

    const subject = await Subject.find({
      where: {
        title: subjectId
      }
    })

    if (!subject) {
      return null
    }

    const user = await findOrCreate(User, 'address', data.address, data)

    let vote = await Vote.find({
      where: {
        user_id: user.id,
        subject_id: subject.id
      }
    })

    if (vote) {
      vote = await Vote.update({
        vote: data.vote
      }, {
        where: {
          id: vote.id
        }
      })
    } else {
      vote = await Vote.create({
        vote: data.vote,
        user_id: user.id,
        subject_id: subject.id
      }).catch(e => {
        console.log('error while voting: ', e)
        return new Promise((resolve, reject) => {
          reject(new Error(e))
        })
      })
    }

    return new Promise(resolve => {
      resolve({
        submission: 'x08q94344as8aaad98s9d8as9d8as' // TODO
      })
    })
  },
  getSubjectPerAddress (subject, address) {
    return new Promise(resolve => {
      resolve({ok: true})
    })
  }
}
