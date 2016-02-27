var mongoose = require('mongoose');

var todosSchema = mongoose.Schema({
  title: String,
  done: Boolean
});

var Todos = mongoose.model('todos', todosSchema);

module.exports = Todos;
