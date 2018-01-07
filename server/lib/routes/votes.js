const express = require('express')
const router = express.Router()
const validations = require('./validations')
const pgdb = require('../database/pgdb')

router.post('/:subject/votes', async (req, res) => {
  try {
    const info = req.body
    const subject = req.params.subject

    /* validate all parameters */

    const data = await pgdb.postVotesPerSubject(subject, info)

    if (!data) {
      /* invalid subject or not found */
      res
        .status(404)
        .json({
          error: 'Subject not found'
        })
    }
    res
      .status(200)
      .json(data)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

router.get('/:subject/votes', async (req, res) => {
  try {
    const subject = req.params.subject
    const data = await pgdb.getVotesPerSubject(subject)

    res
      .status(200)
      .json({
        data
      })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

module.exports = router
