var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/', function(req, res){
  var collection = global.db.collection('artists');
  collection.find().toArray(function(err, artist){
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




module.exports = router;
