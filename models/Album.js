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

Album.prototype.update = function(updatedAlbum, cb){
  Album.collection.update({_id: this._id}, {$set: {
    title: updatedAlbum.title,
    year: updatedAlbum.year
  }}, cb)
}

Album.prototype.remove = function(cb){
  Album.collection.remove({_id: this._id}, cb)
}


Album.findAllByArtist = function(artist_id, cb){
  Album.collection.find({artist_id: ObjectID(artist_id)}).toArray(cb);
}

Album.findByTitle = function(title, cb){
  var re = new RegExp([title], 'i');
  Album.collection.find({title: re}).toArray(cb);
}

Album.findById = function(id, cb){
  Album.collection.findOne({_id: ObjectID(id)}, function(err, album){
    cb(err, setPrototype(album));
  });
}

Object.defineProperty(Album, 'collection', {
  get: function(){
    return global.db.collection('albums');
  }
})

module.exports = Album;

function setPrototype(pojo) {
  return _.create(Album.prototype, pojo);
};
