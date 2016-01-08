server = require './inject.coffee'
port = 3333
server port, 'public', ->
  console.log "Starting local http server on port #{port}!"