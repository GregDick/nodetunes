var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res){
  res.render('templates/albums.ejs');
});





module.exports = router;
