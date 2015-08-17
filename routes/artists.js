var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var Artist = require('../models/Artists')


router.get('/', function(req, res){
  Artist.findAll(function(err, artists){
    if (err) throw err;
    res.render('templates/artists', {artists: artists});
  });
});

router.get('/search', function(req, res){
  Artist.findByName(req.query.search, function(err, artist){
    if (err) throw err;
    res.render('templates/artists', {artists: artist});
  })
});

router.get('/new', function(req, res){
  res.render('templates/artist-new');
})

router.post('/new', function(req, res){
  var collection = global.db.collection('artists');
  collection.save(req.body, function(err, response){
    res.redirect('/artists');
  });
});


router.get('/:id', function(req, res){
  var artistCollection = global.db.collection('artists');
  var albumCollection = global.db.collection('albums');
  artistCollection.findOne({_id: ObjectID(req.params.id)}, function(err, artist){
    albumCollection.find({artist_id: req.params.id}).toArray(function(err, albums){
      res.render('templates/single-artist', {artist: artist, albums: albums});
    })
  })
})

router.post('/:id/edit', function(req, res){
  var collection = global.db.collection('artists');
  collection.update({_id: ObjectID(req.params.id)}, {$set: {
    name: req.body.name,
    genre: req.body.genre,
    origin: req.body.origin
  }}, function(err, response){
    res.redirect('/artists/' + req.params.id );
  });
})


router.post('/:id/delete', function(req, res){
  var collection = global.db.collection('artists');
  collection.remove({_id: ObjectID(req.params.id)}, function(err, result){
    if(err){
      console.log(err);
    }
    res.redirect('/artists');
  })
})


module.exports = router;
