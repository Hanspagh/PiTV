os = require 'os'

connect = require 'connect'
http = require 'http'
request = require 'request'

##################################################
# Initializer
##################################################

serveStatic = require 'serve-static'

middleware = connect()

middleware.use serveStatic 'dist'

app = http.createServer(middleware)
io = require('socket.io')(app)
remote = io.of '/remote'

##################################################
# API Events
##################################################

remote.on 'connection', (socket) ->
  console.log "[Remote] Connected"

  socket.on 'getSerie', (imdbid, fn) ->
    url = 'http://api.popcorntime.io/show/' + imdbid
    console.log "[Remote] getSerie " + url
    request url, (err, res, body) ->
      data = {}
      if err or body is null
        data.error = err
      else
        try
          result = JSON.parse body
          data.result = result
        catch e
          data.error = e
      fn data

  socket.on 'getSeries', (page, fn) ->
    url = 'http://api.popcorntime.io/shows/' + page
    console.log "[Remote] getSeries " + url
    request url, (err, res, body) ->
      data = {}
      if err or body is null
        data.error = err
      else
        try
          result = JSON.parse body
          data.result = result
        catch e
          data.error = e
      fn data

  socket.on 'getMovies', (page, fn) ->
    url = 'https://yts.re/api/list.json?sort=seeds&quality=720p&set=' + page
    console.log "[Remote] getMovies " + url
    request url, (err, res, body) ->
      data = {}
      if err or body is null
        data.error = err
      else
        try
          result = JSON.parse body
          data.result = result
          if result.error isnt null
            data.error = result.error
        catch e
          data.error = e
      fn data

  socket.on 'getMovieTorrents', (imdbid, fn) ->
    url = "https://yts.re/api/listimdb.json?imdb_id=" + imdbid
    console.log "[Remote] getMovieTorrents " + url
    request url, (err, res, body) ->
      data = {}
      if err or body is null
        data.error = err
      else
        try
          result = JSON.parse body
          data.result = result
          if result.error == null
            data.error = result.error
        catch e
          data.error = e
      fn data

##################################################
# Ending
##################################################

console.log "Up and running..."

app.listen 3000
