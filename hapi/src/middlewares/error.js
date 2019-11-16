const ApiError = require('../lib/errors/ApiError')
const ServerError = require('../lib/errors/ServerError')

module.exports = function (err, req, res, next) {
  console.error(err);

  let error = err
  if (!(err instanceof ApiError)) {
    error = new ServerError()
  }

  res.status(error.code || 500);
  res.json({ error: { message: error.message }});
}