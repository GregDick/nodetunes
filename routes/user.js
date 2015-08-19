var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.get('/', function(req, res){
  req.session.regenerate(function(){
    res.render('user/login');
  })
});

router.get('/new', function(req, res){
  req.session.regenerate(function(){
    res.render('user/register', {err: null});
  })
});

router.post('/new', function(req, res){
  User.create(req.body, function(err){
    if (err){
      res.render('user/register', {err: err});
    }
    else{
      res.redirect('/');
    }
  });
});

router.post('/login', function(req, res){
  User.login(req.body, function(err, user){
    req.session.regenerate(function(){
      req.session.user = user;
      res.redirect('/');
    });
  });
});


router.get('/logout', function(req, res){
  req.session.regenerate(function(){
    res.redirect('/login');
  })
})


module.exports = router;
