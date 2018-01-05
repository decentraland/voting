const Joi = require('joi')

const schema = Joi.object().keys({
  title: Joi.string().min(3).max(30).required(),
  // description: Joi.string().min(3).max(30).required(),
  // image: Joi.string().min(3).max(30).required(),
  // addressCount: Joi.number().integer().required(),
  // votesWeight: Joi.number().integer().required(),
  // noWeight: Joi.number().integer().required(),
  // yesCount: Joi.number().integer().required(),
  // abstentionsCount: Joi.number().integer().required(),
  noCount: Joi.number().integer().required()
})

const validateSubject = (data) => {
  const result = Joi.validate(data, schema)
  return !result.error
}

module.exports = {
  validateSubject
}
