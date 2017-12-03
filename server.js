var express = require('express');
var app = express();

//path
var pathToApp = __dirname;

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(pathToApp + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
