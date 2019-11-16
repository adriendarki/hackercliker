const ApiError = require('./ApiError');

module.exports = class NotFoundError extends ApiError {
  code = 404
}