const express = require('express')
const router = express.Router()
const pgdb = require('../database/pgdb')

router.get('/:subject/votes', async (req, res) => {
  try {
    const subject = req.params.subject

    const data = await pgdb.getVotesPerSubject(subject)

    res
      .status(200)
      .json(data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.toString() })
  }
})

router.get('/:subject/votes/:address', async (req, res) => {
  try {
    const { subject, address } = req.params
    const data = await pgdb.getLatestVoteByAddress(subject, address)

    res
      .status(200)
      .json(data)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

router.get('/:subject', async (req, res) => {
  try {
    const subjectId = req.params.subject
    // const validate = validations.validateSubject(stack)
    // if (!validate) {
    //   res
    //     .status(404)
    //     .json({
    //       statusCode: 404,
    //       error: 'Some parameters are missing'
    //     })
    // }
    const data = await pgdb.getSubject(subjectId)
      .then(data => data)
    res
      .status(200)
      .json(data)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

router.get('/subjects/list', async (req, res) => {
  try {
    const data = await pgdb
      .getVisibleSubjects()
      .then(data => data)

    res
      .status(200)
      .json(data)
  } catch (error) {
    res.status(500).json({ error: 'System Error 500' })
  }
})

module.exports = router
