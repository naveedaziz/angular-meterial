var express = require('express');

var path = require('path');
var fs = require('fs');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.get('/schedule', function (req, res) {
   res.sendfile(path.join(__dirname, 'public/index.html'));
});

app.get('/', function (req, res) {
   res.sendfile(path.join(__dirname, 'public/index.html'));
});
app.get('/organization_commitee', function (req, res) {
   res.sendfile(path.join(__dirname, 'public/index.html'));
});
app.get('/sponsors', function (req, res) {
   res.sendfile(path.join(__dirname, 'public/index.html'));
});



app.listen(app.get('port'), function () {
   console.log('Node app is running on port', app.get('port'));
});

