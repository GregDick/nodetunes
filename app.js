var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

if(process.env.NODE_ENV !== 'production'){
  require(path.join(process.cwd(), '/lib/secrets'));
}
require(path.join(process.cwd(), '/lib/mongodb'));

var artists = require(path.join(process.cwd(), '/routes/artists'));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended : true,
  type     : '*/x-www-form-urlencoded'
}));

//========routes======//
app.use('/artists', artists);

var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
