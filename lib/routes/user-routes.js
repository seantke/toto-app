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
        console.log(err);
      }
      else{
        if(user){
          res.json(user.username);
        }
        else{
          res.sendStatus(401);
        }
      }
    });
  });

router.route("/signup")
  .post(function(req, res){
    var passHash = crypto.createHash('sha256').update(req.body.password+secret).digest('hex');

    var newUser = new Users();
    newUser.username = req.body.username;
    newUser.password = passHash;
    newUser.save(function(err, user){
      if(err) {
        res.send('error saving new user');
      }
      else{
        res.json(user.username);
      }
    });
  });

module.exports = router;
