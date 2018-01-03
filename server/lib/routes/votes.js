const express = require('express')
const router = express.Router()
const validations = require('./validations')
const pgdb = require('../database/pgdb')()

/**
 * @swagger
 * /{subject}/votes:
 *  post:
 *     tags:
 *       - subject
 *     summary: Query for a subject information
 *     description:
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: path
 *       name: subject
 *       description: Name of the subject to query
 *       required: true
 *       schema:
 *        properties:
 *          stack:
 *            type: integer
 *            minimum: 1
 *            enum: [100]
 *     responses:
 *       200:
 *         id: Integer
 *         ok: Boolean, operation status
 */
router.post('/:subject/votes', async (req, res) => {
  try {
    const stack = req.body
    /* validate all parameters */

    const validate = validations.validateSubject(stack)
    if (!validate) {
      res
        .status(404)
        .json({
          statusCode: 404,
          error: 'Some parameters are missing'
        })
    }

    const data = await pgdb.postVotesPerSubject(stack)

    res
      .status(200)
      .json({
        ok: true,
        statusCode: 200,
        data
      })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

/**
 * @swagger
 * /{subject}/votes:
 *  get:
 *     tags:
 *       - subject
 *     summary: Query for a subject information
 *     description:
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: path
 *       name: subject
 *       description: Name of the subject to query
 *       required: true
 *       schema:
 *        properties:
 *          stack:
 *            type: integer
 *            minimum: 1
 *            enum: [100]
 *     responses:
 *       200:
 *         id: Integer
 *         ok: Boolean, operation status
 */
router.get('/:subject/votes', async (req, res) => {
  try {
    const subject = req.params.subject
    const data = await pgdb.getVotesPerSubject(subject)

    res
      .status(200)
      .json({
        ok: true,
        statusCode: 200,
        data
      })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

module.exports = router
