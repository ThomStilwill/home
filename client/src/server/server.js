var express = require('express')
var path = require('path')
var app = express()
var jsonServer = require('json-server')

var webroot = path.join(__dirname,'..')
var port = process.env.PORT || 8080

app.use(express.static(webroot))
app.use('/api', jsonServer.router('server/db.json'))
app.all('/*', (req,res) => {
  res.sendFile('index.html',{ root: webroot })
})

app.listen(port)

console.log('webroot ' + webroot)
console.log('Listening on port ' + port)

module.exports = app;
