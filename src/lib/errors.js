const { ValidationError } = require("yup")
const http = require("http")

class AuthenticationError extends Error {
  /**
   * Construct an AuthenticationError with a given message.
   * @param {string} [message=http.STATUS_CODES[401]] - The message to be
   *   associated with this error.
   */
  constructor(message = http.STATUS_CODES[401]) {
    super(message)
    this.message = message
    this.statusCode = 401

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class AuthorizationError extends Error {
  /**
   * Constructs an AuthorizationError with a specified message.
   * Defaults to the HTTP status code 403 message if no message is provided.
   * @param {string} [message=http.STATUS_CODES[403]] - The message to associate with this error.
   */

  constructor(message = http.STATUS_CODES[403]) {
    super(message)
    this.message = message
    this.statusCode = 403

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class NotFoundError extends Error {
  /**
   * Construct a NotFoundError with a given message.
   * @param {string} [message=http.STATUS_CODES[404]] - The message to be
   *   associated with this error.
   */
  constructor(message = http.STATUS_CODES[404]) {
    super(message)
    this.message = message
    this.statusCode = 404

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class ServerError extends Error {
  /**
   * Construct a ServerError with a specified message.
   * Defaults to the HTTP status code 500 message if no message is provided.
   * @param {string} [message=http.STATUS_CODES[500]] - The message to associate with this error.
   */
  constructor(message = http.STATUS_CODES[500]) {
    super(message)
    this.message = message
    this.statusCode = 500

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  ServerError,
}

// module.exports = {
//   UnauthorizedError, // 401
//   ForbiddenError, // 403
//   NotFoundError, // 404
//   ValidationError, // 422
//   ServerError, // 500
// }
