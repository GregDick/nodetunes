var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;
var Album = require('../models/Album');

function Song (id, s){
  this.album_id = ObjectID(id),
  this.userId = ObjectID(s.userId),
  this.title = s.title
};

Song.create = function(id, s, cb){
  var song = new Song(id, s);
  song.save(cb);
};

Song.prototype.save = function (cb){
  Song.collection.save(this, cb);
};

Song.prototype.update = function(updatedSong, cb){
  Song.collection.update({_id: this._id}, {$set: {
    title: updatedSong.title
  }}, cb);
};

Song.prototype.remove = function(cb){
  Song.collection.remove({_id: this._id}, cb);
};

Song.findAllByAlbum = function(id, cb){
  Song.collection.find({album_id: ObjectID(id)}).toArray(cb);
};

Song.findByTitle = function(id, title, cb){
  var re = new RegExp([title], 'i');
  Song.collection.find({userId: ObjectID(id), title: re}).toArray(cb);
};

Song.findById = function(id, cb){
  Song.collection.findOne({_id: ObjectID(id)}, function(err, song){
    cb(err, setPrototype(song));
  });
}

Object.defineProperty(Song, 'collection', {
  get: function (){
    return global.db.collection('songs');
  }
});

module.exports = Song;

function setPrototype (pojo) {
  return _.create(Song.prototype, pojo);
};
