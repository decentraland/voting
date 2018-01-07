const { nodeEnv, setGlobalMiddleware } = require('./utils')
console.log(`Running in ${nodeEnv} mode...`)

const fs = require('fs')
const path = require('path')
const app = require('express')()
setGlobalMiddleware(app)
const routes = require('./routes')
// const models = require('./config/models').connection
const db = require('../models')
const cors = require('cors')
const morgan = require('morgan')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream})) //logger
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

const PORT = process.env.NODE_ENV || 3000

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

app.listen(PORT, () => db.sequelize.sync())
