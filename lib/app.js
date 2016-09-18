var express = require('express');
var app = express();
var path = require('path');
//configure app

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(__dirname + '/public'));
app.use('/bower', express.static(__dirname + '/bower_components'));
app.get('/', function (req, res) {
  res.render('index');
});
app.get('/phaser', function (req, res) {
  res.render('phaser');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});