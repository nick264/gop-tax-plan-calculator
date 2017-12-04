var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000

//path
var pathToApp = __dirname;

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(pathToApp + '/index.html');
});

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT, '!');
});
