const express = require('express')
const router = express.Router()
const validations = require('./validations')

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
router.post('/:subject/votes', (req, res) => {
  try {
    const stack = req.body
    /* validate all parameters */
    console.log(stack)
    const validate = validations.validateSubject(stack)
    if (!validate) {
      res
        .status(404)
        .json({
          statusCode: 404,
          error: 'Some parameters are missing'
        })
    }

    /**
     * Business Logic, return votes
     * 
     */
    res
      .status(200)
      .json({
        ok: true,
        statusCode: 200
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
router.get('/:subject/votes', (req, res) => {
  try {
    const params = req.params
    console.log(params)
    /**
     * Business Logic, return votes
     * 
     */
    res
      .status(200)
      .json({
        ok: true,
        statusCode: 200
      })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

module.exports = router
