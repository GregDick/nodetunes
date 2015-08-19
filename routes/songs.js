var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
//models
var Artist = require('../models/Artist');
var Album = require('../models/Album');
var Song = require('../models/Song');

router.post('/:id/new', function(req, res){
  Song.create(req.params.id, req.body, function(err, song){
    res.redirect('/albums/' + req.params.id);
  });
});

module.exports = router;
