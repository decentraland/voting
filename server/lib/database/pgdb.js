const models = require('../../models')
const utils = require('../utils')
const ethUtils = require('../ethereum/utils')
const User = models.user
const Subject = models.subject
const Vote = models.vote
const Receipt = models.receipt

const { findOrCreate, upsert } = utils

module.exports = {
  async getVisibleSubjects () {
    const subjects = await Subject.findAll({
      where: {
        visible: 1
      }
    })

    return new Promise(resolve => {
      resolve({data: subjects})
    })
  },
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
  async postVotesPerSubject (subjectId, data) {
    const { message, signature, vote } = data
    const { address } = ethUtils.verifyMessage(message, signature) // TODO: handle error here
    const weight = await ethUtils.getBalance(address)

    const subject = await Subject.findOne({
      where: {
        id: subjectId
      }
    })

    if (!subject) {
      return null
    }

    const user = await findOrCreate(User, 'address', address, { address, weight })

    const { serverMessage, serverSignature } = ethUtils.sign()

    const receipt = await Receipt.create({
      vote: data.vote,
      user_message: message,
      user_signature: signature,
      user_id: user.id,
      server_signature: serverSignature,
      server_message: serverMessage,
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
      resolve(receipt)
    })
  },
  async getSubjectPerAddress (subject, address) {
    return new Promise(resolve => {
      resolve({ok: true})
    })
  }, // TODO: do or remove
  async getVotesPerSubject (subjectId) {
    const data = await Receipt.findAll({
      attributes: ['vote', 'created_at'],
      where: {
        subject_id: subjectId
      },
      include: [{
        model: User,
        attributes: ['address']
      }],
      order: [['created_at', 'DESC']] // TODO: limit and offset
    })

    return new Promise(resolve => {
      resolve(data)
    })
  },
  async getLatestVoteByAddress (subjectId, address) {
    const user = await User.findOne({
      where: {
        address: address
      }
    })

    if (!user) {
      return null
    }

    const data = await Receipt.findOne({
      attributes: ['id', 'vote'],
      where: {
        subject_id: subjectId,
        user_id: user.id
      },
      order: [['created_at', 'DESC']]
    })

    return new Promise(resolve => {
      resolve(data)
    })
  },
  async updateUserWeightByAddress (address, weight) {
    const user = await User.findOne({
      where: {
        address: address
      }
    }).then((user) => {
      if (user) { // update
        return user.update({ weight: weight })
      }
      return user
    })
    return new Promise(resolve => {
      resolve(user)
    })
  }
}
