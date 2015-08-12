var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

if(process.env.NODE_ENV !== 'production'){
  require(path.join(process.cwd(), '/lib/secrets'));
}
require(path.join(process.cwd(), '/lib/mongodb'));

var index = require(path.join(process.cwd(), '/routes/index'));
var artists = require(path.join(process.cwd(), '/routes/artists'));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended : true,
  type     : '*/x-www-form-urlencoded'
}));

//========routes======//
app.use('/', index)
app.use('/artists', artists);


app.use(function (err, req, res, next) {
  // pass 4 arguments to create an error handling middleware
  console.log('ERRRRRRRRRR', err.stack);
  res.status(500).send('My Bad');
});



var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
