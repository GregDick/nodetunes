var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

if(process.env.NODE_ENV !== 'production'){
  require(path.join(process.cwd(),'/lib/secret'));
}
require(path.join(process.cwd(), '/lib/mongodb'));

app.set('view engine', 'ejs');



var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
