var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/', function(req, res){
  var collection = global.db.collection('artists');
  collection.find().toArray(function(err, artist){
    var prettyArtists = artist.map(function(artist){
      return{
        _id : artist._id,
        name : artist.name,
        genre: artist.genre,
        origin: artist.origin || 'N/A'
      }
    })
    res.render('templates/artists', {artists: prettyArtists});
  })
});

router.get('/search', function(req, res){
  var collection = global.db.collection('artists');
  collection.find({name: req.query.search}).toArray(function(err, artist){
    var prettyArtists = artist.map(function(artist){
      return{
        name : artist.name,
        genre: artist.genre,
        origin: artist.origin || 'N/A'
      }
    })
    res.render('templates/artists', {artists: prettyArtists});
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
  var collection = global.db.collection('artists');
  var albumCollection = global.db.collection('albums');
  collection.findOne({_id: ObjectID(req.params.id)}, function(err, artist){
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
