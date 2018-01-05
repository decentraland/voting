const express = require('express')
const router = express.Router()
const pgdb = require('../database/pgdb')

router.get('/:subject/votes', async (req, res) => {
  try {
    const subject = req.params.subject

    const data = await pgdb.getTotalVotes(subject)

    res
      .status(200)
      .json({data})

  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

/**
 * @swagger
 * /subject:
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

module.exports = router
