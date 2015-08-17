var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

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
  var collection = global.db.collection('albums');
  collection.save(
    {artist_id: req.params.id,
    title: req.body.title,
    year: req.body.year
    }, function(err, response){
      res.redirect('/artists/'+req.params.id);
    })
})

module.exports = router;
