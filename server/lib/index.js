const { nodeEnv, setGlobalMiddleware } = require('./utils')
console.log(`Running in ${nodeEnv} mode...`)

const app = require('express')()
setGlobalMiddleware(app)
const routes = require('./routes')
// const models = require('./config/models').connection
const db = require('../models')
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan(('tiny'))) // logger
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

app.listen(PORT, () => {
  console.log(`Listen to port ${PORT}`)
  // startWatcher()
  db.sequelize.sync()
})

/* Blockchain Watcher */
function startWatcher () {
  const callBack = (data) => {
    console.log('{{{{{{{DATA}}}}}}', data)
  }
  const web3 = new Web3('https://ropsten.etherscan.io/')
  var subscription = web3
    .eth
    .subscribe('newBlockHeaders', function (error, result) {
      if (!error) {
        console.log(error)
      }
    })
    .on('data', function (blockHeader) {
      console.log(data)
    })
  web3
    .eth
    .subscribe('pendingTransactions', callBack)
    .on('data', function (blockHeader) {
      console.log(data)
    })
}
