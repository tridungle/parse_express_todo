
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
// Parse.Cloud.define("hello", function(request, response) {
//   response.success("Hello world!");
// });

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res){
  res.render('index')
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});