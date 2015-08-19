var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
//models
var Artist = require('../models/Artist');
var Album = require('../models/Album');


router.get('/', function(req, res){
  Artist.findAllByUserId(req.session.user._id, function(err, artists){
    if (err) throw err;
    res.render('templates/artists', {artists: artists});
  });
});

router.get('/search', function(req, res){
  Artist.findByName(req.session.user._id, req.query.search, function(err, artist){
    if (err) {
      console.log(err);
    }else{
      res.render('templates/artists', {artists: artist});
    }
  })
});

router.get('/new', function(req, res){
  res.render('templates/artist-new');
})

router.post('/new', function(req, res){
  var a = req.body;
  a.userId = req.session.user._id;
  Artist.create(a, function(){
    res.redirect('/artists');
  })
});


router.get('/:id', function(req, res){
  Artist.findById(req.params.id, function(err, artist){
    Album.findAllByArtist(req.params.id, function(err, albums){
      if (err) throw err;
      res.render('templates/single-artist', {artist: artist, albums: albums});
    });
  });
})

router.post('/:id/edit', function(req, res){
  Artist.findById(req.params.id, function(err, artist){
    artist.update(req.body, function(err, artist){
      res.redirect('/artists/' + req.params.id );
    });
  });
})


router.post('/:id/delete', function(req, res){
  Artist.findById(req.params.id, function(err, artist){
    artist.remove(function(err, response){
      if (err) throw err;
      res.redirect('/artists');
    });
  });
})


module.exports = router;
