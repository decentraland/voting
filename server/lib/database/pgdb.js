const models = require('../../models')
const utils = require('../utils')
const User = models.user
const Subject = models.subject
const Vote = models.vote
const Receipt = models.receipt

const {findOrCreate, upsert} = utils

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
      attributes: ['vote'],
      include: [{
        model: User,
        attributes: ['weight']
      }],
      where: {
        subject_id: subject.id
      }
    })

    return new Promise(resolve => {
      resolve(votes.reduce((normalizedSubject, vote) => {
        normalizedSubject['address_count'] = votes.length
        normalizedSubject['votes_weight'] += parseInt(vote.user.weight)
        normalizedSubject['yes_weight'] += vote.vote === 'yes' ? parseInt(vote.user.weight) : 0
        normalizedSubject['abstentions_weight'] += vote.vote === 'abstain' ? parseInt(vote.user.weight) : 0
        normalizedSubject['no_weight'] += vote.vote === 'no' ? parseInt(vote.user.weight) : 0
        normalizedSubject['yes_count'] += vote.vote === 'yes' ? 1 : 0
        normalizedSubject['no_count'] += vote.vote === 'no' ? 1 : 0
        normalizedSubject['abstentions_count'] += vote.vote === 'abstain' ? 1 : 0
        return normalizedSubject
      }, {
        id: subject.id,
        image: subject.image,
        title: subject.title,
        description: subject.description,
        'address_count': 0,
        'votes_weight': 0,
        'yes_weight': 0,
        'abstentions_weight': 0,
        'no_weight': 0,
        'yes_count': 0,
        'abstentions_count': 0,
        'no_count': 0

      }))
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

    const receipt = await Receipt.create({
      vote: data.vote,
      user_id: user.id,
      subject_id: subject.id
    })
    .catch(e => {
      console.log('error while creating receipt: ', e)
      return new Promise((resolve, reject) => {
        reject(new Error(e))
      })
    })

    await upsert(Vote, {
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
        submission: receipt.id
      })
    })
  },
  getSubjectPerAddress (subject, address) {
    return new Promise(resolve => {
      resolve({ok: true})
    })
  },
  async getTotalVotes (id) {
    const data = await Receipt.findAll({
      attributes: ['vote', 'created_at'],
      where: {
        subject_id: id
      },
      include: [{
        model: User,
        attributes: ['address']
      }]
    })

    return new Promise(resolve => {
      resolve(data)
    })
  }
}
