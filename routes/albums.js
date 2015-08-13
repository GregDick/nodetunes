var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res){
  res.render('templates/albums.ejs');
});

router.get('/albums/search', function(req, res){

})

router.post('/:id/new', function(req, res){
  var collection = global.db.collection('albums');
  collection.save(
    {_id: ObjectID(req.params.id),
    title: req.body.title,
    year: req.body.year
    }, function(err, response){
      res.redirect('/artists/'+req.params.id);
    })
})

module.exports = router;
