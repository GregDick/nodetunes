var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
//models
var Artist = require('../models/Artist');
var Album = require('../models/Album');
var Song = require('../models/Song');

router.get('/', function(req, res){
  res.render('templates/songs.ejs', {songs: []});
})

router.get('/search', function(req, res){
  Song.findByTitle(req.session.user._id, req.query.title, function(err, songs){
    //using promise because forEach loop is asynchronous
    new Promise(function(resolve, reject){
      //find artist by id and add artist's name to album object
      songs.forEach(function(song, i){
        Album.findById(song.album_id, function(err, album){
          song.album = album.title;
          //only resolve on last array item
          if(i === songs.length-1) resolve(songs);
        });
      });
    })
    .then(
      function(albums){
        res.render('templates/songs.ejs', {songs: songs})
      })
  })
})

router.post('/:id/new', function(req, res){
  var s = req.body;
  s.userId = req.session.user._id;
  Song.create(req.params.id, s, function(err, song){
    res.redirect('/albums/' + req.params.id);
  });
});

router.get('/:id/edit', function(req, res){
  Song.findById(req.params.id, function(err, song){
    res.render('templates/song-edit.ejs', {song: song});
  })
});

router.post('/:id/edit', function(req, res){
  Song.findById(req.params.id, function(err, song){
    song.update(req.body, function(err, response){
      console.log(song);
      res.redirect('/albums/' + song.album_id);
    });
  });
});

router.get('/:id/delete', function(req, res){
  Song.findById(req.params.id, function(err, song){
    song.remove(function(){
      res.redirect('/albums/' + song.album_id);
    })
  })
})



module.exports = router;
