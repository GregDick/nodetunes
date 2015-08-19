var bcrypt = require('bcrypt');
var _ = require('lodash');


function User (u) {
  this.email = u.email;
  this.hashedPassword = u.hashedPassword;
};

User.create = function(u, cb){
  if(u.password !== u.password_confirm){
    cb('Passwords do not match');
    return;
  }
  //check for unique email
  User.findByEmail(u.email, function(err, user){
    if(user.email){
      //email already in use
      cb('Email already in use');
    }else{
      bcrypt.hash(u.password, 8, function(err, hash){
        u.hashedPassword = hash;
        var user = new User(u);
        user.save(cb);
      });
    }
  })
};

User.prototype.save = function(cb){
  User.collection.save(this, cb);
};

User.findByEmail = function(email, cb){
  User.collection.findOne({email: email}, function(err, user){
    cb(err, setPrototype(user));
  });
};

User.login = function(u, cb){
  User.findByEmail(u.email, function(err, user){
    if(user){
      bcrypt.compare(u.password, user.hashedPassword, function(err, match){
        if(match){
          cb(null, user);
        }else{
          cb('Bad email or password');
        }
      })
    }else{
      cb('Bad email or password');
    }
  });
};

Object.defineProperty(User, 'collection', {
  get: function () {
    return global.db.collection('user');
  }
});

module.exports = User;

function setPrototype(pojo) {
  return _.create(User.prototype, pojo);
};
