// Express
var express = require('express');
var router = express.Router();
// Mongoose Schema
var Users = require('../models/users-model');
var Todos = require('../models/todos-model');


router.route("/get")
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
router.route("/create")
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
router.route("/:id/edit")
  .put(function(req, res){
    Users.findOne({
      _id: req.params.id
    }).exec(function(err, todo){
      if(err) {
        res.send("Internal Error").status(500);
      }
      else if(!todo){
        res.send("Not found").status(401);
      }
      else{
        todo = req.body;
        res.send("OK").status(200);
      }
    });
  });
router.route("/:id/delete")
  .delete(function(req, res){

  });

module.exports = router;
