module.exports = (port, path, cb) ->
  express = require 'express'
  http = require 'http'
  app = do express
  entrypoint = express.static path
  app.use entrypoint
  server = http.createServer(app).listen port, cb
  # Additional Logic goes here!
  server