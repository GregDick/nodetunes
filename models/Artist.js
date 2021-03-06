var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;
var Album = require('../models/Album');

function Artist(a){
  this.userId = ObjectID(a.userId),
  this.name   = a.name,
  this.genre  = a.genre,
  this.origin = a.origin
};

Artist.create = function(a, cb){
  var artist = new Artist(a);
  artist.save(cb);
};

Artist.prototype.save = function(cb){
  Artist.collection.save(this, cb);
};

Artist.prototype.update = function(updatedArtist, cb){
  Artist.collection.update({_id: this._id}, {$set: {
    name: updatedArtist.name,
    genre: updatedArtist.genre,
    origin: updatedArtist.origin
  }}, cb);
};

Artist.prototype.remove = function(cb){
  var artist_id = this._id;
  Album.collection.remove({artist_id: artist_id}, {multi: true}, function(){
    Artist.collection.remove({_id: artist_id}, cb)
  })
};

Artist.findById = function(id, cb){
  Artist.collection.findOne({_id: ObjectID(id)}, function(err, artist){
    cb(err, setPrototype(artist));
  })
};

Artist.findByName = function(id, name, cb){
  var re = new RegExp([name], 'i');
  Artist.collection.find({userId: ObjectID(id), name: {$regex: re}}).toArray(cb);
}

Artist.findAllByUserId = function(id, cb){
  Artist.collection.find({userId: ObjectID(id)}).toArray(function(err, artists){
    var prototypedArtists = artists.map(function (artist) {
      return setPrototype(artist);
    });

    cb(err, prototypedArtists);
  });
};

Object.defineProperty(Artist, 'collection', {
  get: function() {
    return global.db.collection('artists');
  }
});

module.exports = Artist;

function setPrototype(pojo) {
  return _.create(Artist.prototype, pojo);
};

