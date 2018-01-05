//const models = require('../config/models').models
const models = require('../../models')
const User = models.user
const Subject = models.subject
const Vote = models.vote

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

const upsert = async (model, condition, values, ) => {
  return model
  .findOne({ where: condition })
  .then((obj) => {
    if(obj) { // update
      return obj.update(values);
    }
    else { // insert
      return model.create(values);
    }
  })
}

module.exports = {
  async getSubject (subjectId) {
    const subject = await Subject.find({
      where: {
        id: subjectId
      }
    })

    if (!subject) {
      return null
    }

    let votes = await Vote.findAll({
      where: {
        subject_id: subject.id
      }
    })


    return new Promise(resolve => {
      resolve({
        votes: votes,
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
  async postVotesPerSubject (subjectId, data) {
    const subject = await Subject.findOne({
      where: {
        id: subjectId
      }
    })

    if (!subject) {
      return null
    }

    const user = await findOrCreate(User, 'address', data.address, data)

    const vote = await upsert(Vote, {
      user_id: user.id,
      subject_id: subject.id
    },
    {
      vote: data.vote,
      user_id: user.id,
      subject_id: subject.id
    })
    .catch(e => {
      console.log('error while voting: ', e)
      return new Promise((resolve, reject) => {
        reject(new Error(e))
      })
    })

    return new Promise(resolve => {
      resolve({
        submission: vote.id
      })
    })
  },
  getSubjectPerAddress (subject, address) {
    return new Promise(resolve => {
      resolve({ok: true})
    })
  }
}
