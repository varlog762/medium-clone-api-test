const http = require("http")
const stoppable = require("stoppable")
const pEvent = require("p-event")
const util = require("util")

/**
 * Creates and starts an HTTP server with stoppable functionality.
 *
 * @param {Object} app - The Koa application instance.
 * @param {number} port - The port number on which the server should listen.
 * @param {string} host - The hostname on which the server should listen.
 * @returns {Promise<Object>} - A promise that resolves to the server instance.
 */

module.exports = async function createServerAndListen(app, port, host) {
  const server = stoppable(http.createServer(app.callback()), 7000)

  server.listen(port, host)

  server.stop = util.promisify(server.stop)

  await pEvent(server, "listening")

  return server
}
