const NotFoundError = require('../lib/errors/NotFoundError')

module.exports = function (req, res, next) {
  next(new NotFoundError())
}