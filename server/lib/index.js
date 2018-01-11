const { nodeEnv, setGlobalMiddleware } = require('./utils')
console.log(`Running in ${nodeEnv} mode...`)
const path = require('path')
const fs = require('fs')

const app = require('express')()
setGlobalMiddleware(app)

const routes = require('./routes')
const db = require('../models')
const cors = require('cors')
const morgan = require('morgan')
const env = require('decentraland-commons').env
// const ethUtils = require('./ethereum/utils')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream})) // logger

app.use('/', routes)
app.use(cors('*'))

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      ok: true,
      status: 200
    })
})

const PORT = process.env.NODE_ENV || 3001

/*
  used for error handling / stack trace
*/
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.code || 500)
      .json({
        status: 500,
        message: err
      })
  })
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
    .json({
      status: 500,
      message: err.message
    })
})

env.load()

app.listen(PORT, () => {
  console.log(`Listen to port ${PORT}`)
  // ethUtils.watchBlocks()
  db.sequelize.sync()
})


