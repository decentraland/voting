const bodyParser = require('body-parser')

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  setGlobalMiddleware: (app) => {
    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
  }
}

