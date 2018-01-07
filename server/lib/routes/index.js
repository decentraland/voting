const express = require('express')
const router = express.Router()

/* routes */
const subject = require('./subject')
const votes = require('./votes')

router.use(subject)
router.use(votes)

module.exports = router
