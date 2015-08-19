var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;
var Artist = require('../models/Artist');
var Song = require('../models/Song');

function Album(id, a){
  this.userId    = ObjectID(a.userId),
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
  var album_id = this._id;
  Song.collection.remove({album_id: album_id}, {multi: true}, function(){
    Album.collection.remove({_id: album_id}, cb);
  })
}


Album.findAllByArtist = function(artist_id, cb){
  Album.collection.find({artist_id: ObjectID(artist_id)}).toArray(cb);
}

Album.findByTitle = function(id, title, cb){
  var re = new RegExp([title], 'i');
  Album.collection.find({userId: ObjectID(id), title: re}).toArray(cb);
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
