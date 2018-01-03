const express = require('express')
const router = express.Router()

/* routes */
const address = require('./address')
const subject = require('./subject')
const votes = require('./votes')

router.use(address)
router.use(subject)
router.use(votes)

module.exports = router
