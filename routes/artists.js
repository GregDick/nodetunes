var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  var collection = global.db.collection('nodetunes');
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



module.exports = router;
