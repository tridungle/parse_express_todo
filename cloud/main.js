var express = require('express');
var ejs = require ('ejs')
var app = express();

app.set('views', 'views')
app.set('view engine', 'ejs');
app.use(express.static('public')); // comment out when deploying to parse

app.get('/', function (req, res){
  res.render('index')
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});