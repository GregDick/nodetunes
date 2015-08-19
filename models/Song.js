var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;
var Album = require('../models/Album');

function Song (id, s){
  this.album_id = ObjectID(id),
  this.title = s.title
}

Song.create = function(id, s, cb){
  var song = new Song(id, s);
  song.save(cb);
}

Song.prototype.save = function (cb){
  Song.collection.save(this, cb);
}

Song.findAllByAlbum = function(id, cb){
  Song.collection.find({album_id: ObjectID(id)}).toArray(cb);
}


Object.defineProperty(Song, 'collection', {
  get: function (){
    return global.db.collection('songs');
  }
})

module.exports = Song;

function setPrototype (pojo) {
  return _.create(Song.prototype, pojo);
}
