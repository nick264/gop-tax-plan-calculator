var express = require('express');
var forceSSL = require('express-force-ssl');
var app = express();
const PORT = process.env.PORT || 3000

//path
var pathToApp = __dirname;

app.use('/static', express.static(__dirname + '/public'));

if(process.env.NODE_ENV === 'production') {
  app.use(forceSSL);  
}

app.get('/', function(req, res) {
  res.sendFile(pathToApp + '/index.html');
});

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT, '!');
});
