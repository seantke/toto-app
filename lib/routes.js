var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://seantke:thedatabasepasswordforseantke@ds047632.mlab.com:47632/heroku_6jb577lq');
var Users = require('./db-todo-users');
var Todos = require('./db-todo-todos');

router.use('/node', express.static(__dirname + '/../node_modules'));
router.use(express.static(__dirname + '/../public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.route("/todos")
  .get(function(req, res, next){
    Todos.find({})
      .exec(function(err, todos){
        if(err) {
          res.send('error has occured');
        }
        else{
          res.json(todos);
        }
      });
  })
  .post(function(req, res){
    var newTodo = new Todos();
    newTodo.title = req.body.title;
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
    Users.findOne({
      username: req.body.username,
      password: req.body.password
    }).exec(function(err, user){
      if(err) {
        console.log(err);
      }
      else{
        if(user){
          res.json(user.username);
        }
        else{
          res.sendStatus(400);
        }
      }
    });
  });

router.route("/signup")
  .post(function(req, res){
    var newUser = new Users();
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    newUser.save(function(err, user){
      if(err) {
        res.send('error saving new user');
      }
      else{
        res.json(user);
      }
    });
  });

module.exports = router;
