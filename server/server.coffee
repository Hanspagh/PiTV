connect = require 'connect'
io = require 'socket.io'
http = require 'http'

serveStatic = require 'serve-static'

middleware = connect()

middleware.use serveStatic 'dist'

app = http.createServer(middleware)
socket = io(app)

app.listen 3000
