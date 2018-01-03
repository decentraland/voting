const bodyParser = require('body-parser')

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  setGlobalMiddleware: (app) => {
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
  }
}
