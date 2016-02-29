'use strict';
//Express
var express = require('express');
var app = express();
//Local Routes
var TodoRouter = require('./routes/todo-routes');
var UserRouter = require('./routes/user-routes');
//Morgan
var morgan = require('morgan');
//VARS
var PORT = process.env.PORT || 3000;
//Body Parser
var bodyParser = require('body-parser');
// Mongoose
var mongoose = require('mongoose');
var mongoServer = process.env.MONGOLAB_URI || "mongodb://localhost/todoapp";
mongoose.connect(mongoServer);
var db = mongoose.connection;
db.on('error', function(msg){
  console.log("db connection failed");
});
db.once('open', function(){
  console.log("db connection succeeded");
});

app.use(morgan('dev'));
app.use('/node', express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/todos", TodoRouter);
app.use("/users", UserRouter);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
