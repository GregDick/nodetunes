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
  Album.findByTitle(req.query.title, function(err, albums){
    //using promise because forEach loop is asynchronous
    new Promise(function(resolve, reject){
      //find artist by id and add artist's name to album object
      albums.forEach(function(album, i){
        Artist.findById(album.artist_id, function(err, artist){
          album.artist = artist.name;
          //only resolve on last array item
          if(i === albums.length-1) resolve(albums);
        });
      });
    })
    .then(
      function(albums){
        res.render('templates/albums.ejs', {albums: albums})
      })
  })
})

router.get('/:id', function(req, res){
  Album.findById(req.params.id, function(err, album){
    res.render('templates/single-album', {album: album});
  });
});

//add album
router.post('/:id/new', function(req, res){
  Album.create(req.params.id, req.body, function(err, album){
    if (err) throw err;
    res.redirect('/artists/'+req.params.id);
  })
})

module.exports = router;
