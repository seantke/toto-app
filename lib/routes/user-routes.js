// Express
var express = require('express');
var router = express.Router();
// Mongoose Schema
var Users = require('../models/users-model');
var Todos = require('../models/todos-model');
// Crypto and Hashing
var crypto = require('crypto');
var secret = crypto.createHash('sha256').update("ihaveasecret").digest('hex');

router.route("/login")
  .post(function(req, res, next){

    var passHash = crypto.createHash('sha256').update(req.body.password+secret).digest('hex');

    Users.findOne({
      username: req.body.username,
      password: passHash
    }).exec(function(err, user){
      if(err) {
        res.send("<h1> Internal Server Error</h1>").status(500);
      }
      else if(!user){
        res.send("<h1>User not found</h1>").status(401);
      }
      else{
        var key = createKey(user.username, secret);
        user.sessionKey = key;
        user.save();
        var response = {
          user: user.username,
          sessionKey: key
        };
        res.json(JSON.stringify(response));
      }
    });
  });
router.route("/loggedIn")
  .post(function(req, res){
    console.log(req.body);
    Users.findOne({
      username: req.body.user,
      sessionKey: req.body.sessionKey
    }).exec(function(err, user){
      if(err) {
        res.send("<h1> Internal Server Error</h1>").status(500);
      }
      else if(!user){
        res.send(false).status(401);

      }
      else{
        res.send(true).status(200);
      }
    });
  });
router.route("/signup")
  .post(function(req, res){
    var passHash = crypto.createHash('sha256').update(req.body.password+secret).digest('hex');

    var newUser = new Users();
    newUser.username = req.body.username;
    newUser.password = passHash;
    newUser.sessionKey = createKey(newUser.username, secret);
    newUser.save(function(err, user){
      if(err) {
        res.send('error saving new user');
      }
      else{
        res.json(user.username);
      }
    });
  });

function createKey(username, secret){
  var now = Date.now();
  var key = crypto.createHash('sha256').update(username+secret+now).digest('hex');
  return key;
}

module.exports = router;
