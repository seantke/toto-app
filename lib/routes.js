// Express
var express = require('express');
var router = express.Router();
// Body Parser
var bodyParser = require('body-parser');
// Crypto and Hashing
var crypto = require('crypto');
// Mongoose
var mongoose = require('mongoose');
var db = mongoose.connect(process.env.MONGOLAB_URI);
// Mongoose Schema
var Users = require('./db-todo-users');
var Todos = require('./db-todo-todos');
// JSON Web Token
var jwt = require('jsonwebtoken');
var secret = crypto.createHash('sha256').update("ihaveasecret").digest('hex');


router.use('/node', express.static(__dirname + '/../node_modules'));
router.use(express.static(__dirname + '/../public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.route("/todos/get")
  .post(function(req, res){
    Todos.find({createdBy:req.body.createdBy})
      .exec(function(err, todos){
        if(err) {
          res.send('error has occured');
        }
        else{
          res.json(todos);
        }
      });
  });
router.route("/todos/create")
  .post(function(req, res){
    var newTodo = new Todos();
    newTodo.title = req.body.title;
    newTodo.createdBy = req.body.createdBy;
    newTodo.done = false;

    newTodo.save(function(err, todo){
      if(err) {
        res.send('error saving new todo');
      }
      else{
        res.json(todo);
      }
    });
  });

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
