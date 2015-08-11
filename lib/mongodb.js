var mongo = require('mongodb').MongoClient;

if(!global.db) {
  var url = process.env.MONGODB_URL;
  mongo.connect('mongodb://localhost:27017/nodetunes',function(err,db) {
    global.db = db;
  });
}

