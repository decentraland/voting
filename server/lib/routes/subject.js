const express = require('express')
const router = express.Router()

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
router.get('/:subject', (req, res) => {
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
        statusCode: 200,
        votes: null,
        subject: {
          id: 1,
          subject: 'Should new land be sold at 1000 MANA per unit, on a first-come first-serve basis?',
          participantsNumber: 4387,
          participantsPercentage: 45,
          positive: 1,
          negative: 1,
          abstentions: 1,
          voted: false, //TODO: get voted from server
          loading: false
        }
      })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

module.exports = router
