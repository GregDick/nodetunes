var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;
var Artist = require('../models/Artist');

function Album(id, a){
  this.artist_id = ObjectID(id),
  this.title     = a.title,
  this.year      = a.year
}

Album.create = function(id, a, cb){
  var album = new Album(id, a);
  album.save(cb);
}

Album.prototype.save = function(cb) {
  Album.collection.save(this, cb);
};

Album.findAllByArtist = function(artist_id, cb){
  Album.collection.find({artist_id: ObjectID(artist_id)}).toArray(cb);
}


Object.defineProperty(Album, 'collection', {
  get: function(){
    return global.db.collection('albums');
  }
})

module.exports = Album;

function setPrototype(pojo) {
  return _.create(Artist.prototype, pojo);
};
