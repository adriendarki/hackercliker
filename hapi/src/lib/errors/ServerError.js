const ApiError = require('./ApiError');

module.exports = class ServerError extends ApiError {
  code = 500
}