const { nodeEnv } = require('./utils')
console.log(`Running in ${nodeEnv} mode...`)

// const pg = require('pg')
// const pgConfig = require('../config/pg')[nodeEnv]
// const pgPool = new pg.Pool(pgConfig)
// const pgdb = require('../database/pgdb')(pgPool)

const app = require('express')()

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      ok: true,
      data: null
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
        status: 'error',
        message: err
      })
  })
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
