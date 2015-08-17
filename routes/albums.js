var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
//models
var Artist = require('../models/Artist');
var Album = require('../models/Album');

router.get('/', function(req, res){
  res.render('templates/albums.ejs', {albums: []});
});

router.get('/search', function(req, res){
  var albumCollection = global.db.collection('albums');
  var artistCollection = global.db.collection('artists');
  albumCollection.find({title: req.query.title}).toArray(function(err, albums){
    console.log(albums);
    res.render('templates/albums.ejs', {albums: albums});
  })
})

router.post('/:id/new', function(req, res){
  Album.create(req.params.id, req.body, function(err, album){
    if (err) throw err;
    res.redirect('/artists/'+req.params.id);
  })
})

module.exports = router;
