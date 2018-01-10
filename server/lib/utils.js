const bodyParser = require('body-parser')

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  setGlobalMiddleware: (app) => {
    app.use(function (req, res, next) {
      // res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
  },
  findOrCreate: async (model, cond, value, data) => {
    let instance = await model.find({
      where: {
        [cond]: value
      }
    })
    if (!instance) {
      instance = await model.create(data)
    }
    return instance
  },
  upsert: async (model, condition, values) => {
    return model
      .findOne({ where: condition })
      .then((obj) => {
        if (obj) { // update
          return obj.update(values)
        } else { // insert
          return model.create(values)
        }
      })
  },
}

