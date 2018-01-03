/*
  GET /:subject DONE
  POST /:subject/votes DONE
  GET /:subject/votes DONE
  GET /:subject/votes/:address
*/

const express = require('express')
const router = express.Router()
const validations = require('./validations')

const handleError = (code, message, res) => {
  return res
    .status(code)
    .json({message})
}

router.get('/:subject', (req, res) => {
  try {
    const params = req.params
    /**
     * Business Logic, return votes
     * 
     */
    res
      .status(200)
      .json({
        ok: true,
        statusCode: 200,
        votes: null
      })

  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}) 


router.post('/:subject/votes', (req, res) => {
  try {
    const stack = req.body
    /* validate all parameters */
    const validate = validations.validateSubject(stack)
    if (!validate) handleError(400, 'Some parameters are missing', res)

    /**
     * Business Logic, return votes
     * 
     */
    res
      .status(200)
      .json({
        ok: true,
        statusCode: 200,
      })

  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
  })



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
        statusCode: 200
      })

  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})  

router.get('/:subject/votes', (req, res) => {
  try {
    const params = req.params
    /**
     * Business Logic, return votes
     * 
     */
    res
      .status(200)
      .json({
        ok: true,
        statusCode: 200,
        votes: null
      })

  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})  

router.get('/:subject/votes/:address', (req, res) => {
  try {
    const params = req.params
    /**
     * Business Logic, return votes
     * 
     */
    res
      .status(200)
      .json({
        ok: true,
        statusCode: 200,
        votes: null
      })

  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}) 



  module.exports = router
