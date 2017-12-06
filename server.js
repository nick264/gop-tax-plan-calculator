var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000

//path
var pathToApp = __dirname;

//force ssl
var https_redirect = function(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] != 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        } else {
            return next();
        }
    } else {
        return next();
    }
};

app.use(https_redirect);

// define /static
app.use('/static', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendFile(pathToApp + '/index.html');
});

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT, '!');
});
